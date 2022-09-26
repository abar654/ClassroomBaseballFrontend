import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Scorecard } from "../scorecards/models/scorecard.model";
import { ScorecardsService } from "../scorecards/scorecards.service";
import { GamesApi } from "./apis/games.api";
import { Game } from "./models/game.model";

/**
 * Provides an interface to components for accessing and managing games.
 */

 @Injectable({providedIn: 'root'})
 export class GamesService {

    private loadedGameState: BehaviorSubject<Game> = new BehaviorSubject<Game>(null);
    private rankedScorecardsState: BehaviorSubject<Scorecard[]> = new BehaviorSubject<Scorecard[]>([]);
    private alphabeticalScorecardsState: BehaviorSubject<Scorecard[]> = new BehaviorSubject<Scorecard[]>([]);

    private backupScorecards: Scorecard[] = [];
    private readonly MAX_BACKUP: number = 25;

    constructor(
        private gamesApi: GamesApi,
        private scorecardsService: ScorecardsService
    ) {
        this.loadedGameState.subscribe(() => {
            this.generateScorecardLists();
        });
    }

    public getLoadedGameState(): BehaviorSubject<Game> {
        return this.loadedGameState;
    }

    public getRankedScorecardsState(): BehaviorSubject<Scorecard[]> {
        return this.rankedScorecardsState;
    }

    public getAlphabeticalScorecardsState(): BehaviorSubject<Scorecard[]> {
        return this.alphabeticalScorecardsState;
    }

    public loadGame(teamId: number, gameId: number): Promise<Game> {
        return this.gamesApi.getGame(teamId, gameId)
            .pipe(
                tap((game: Game) => {
                    this.loadedGameState.next(game);
                })
            )
            .toPromise();
    }

    public unloadGame(): void {
        this.loadedGameState.next(null);
    }

    public createGame(teamId: number, name: string, date: number): Promise<Game> {
        return this.gamesApi.createGame(teamId, name, date)
            .toPromise();
    }

    public updateGame(teamId: number, gameId: number, name: string, date: number): Promise<void> {
        return this.gamesApi.updateGame(teamId, gameId, name, date)
            .pipe(
                tap(() => {
                    // Check if the loaded game was updated.
                    // If it was, then update it locally.
                    const loadedGame = this.loadedGameState.getValue();
                    if (loadedGame && loadedGame.id === gameId) {
                        loadedGame.name = name;
                        loadedGame.date = date;
                        this.loadedGameState.next(loadedGame);
                    }
                })
            )
            .toPromise();
    }

    public deleteGame(teamId: number, gameId: number): Promise<void> {
        return this.gamesApi.deleteGame(teamId, gameId)
            .pipe(
                tap(() => {
                    // Check if the loaded game was deleted.
                    const loadedGame = this.loadedGameState.getValue();
                    if (loadedGame && loadedGame.id === gameId) {
                        this.unloadGame();
                    }
                })
            )
            .toPromise();
    }

    public createScorecardForLoadedGame(playerId: number, bases: number, strikes: number): Promise<Scorecard> {
        const loadedGame = this.getLoadedGameState().getValue();
        return loadedGame && this.scorecardsService.createScorecard(
                loadedGame.team.id, 
                loadedGame.id,
                playerId,
                bases,
                strikes
            ).then((scorecard: Scorecard) => {
                this.loadedGameState.next({
                    ...loadedGame,
                    scorecards: loadedGame.scorecards.concat([scorecard])
                });
                return scorecard;
            });
    }

    public updateScorecardForLoadedGame(scorecardId: number, bases: number, strikes: number, skipBackup: boolean = false): Promise<void> {
        const loadedGame = this.getLoadedGameState().getValue();
        return loadedGame && this.scorecardsService.updateScorecard(
            loadedGame.team.id, 
            loadedGame.id,
            scorecardId,
            bases,
            strikes
        ).then(() => {
            this.loadedGameState.next({
                ...loadedGame,
                scorecards: loadedGame.scorecards.map(scorecard => {
                    if (scorecard.id === scorecardId) {

                        if (!skipBackup) {
                            // Backup this scorecard state in the list of changes.
                            this.backupScorecards.push({
                                id: scorecard.id,
                                bases: scorecard.bases,
                                strikes: scorecard.strikes
                            });
                            // Make sure the backup list doesn't grow too large.
                            if (this.backupScorecards.length > this.MAX_BACKUP) {
                                this.backupScorecards.shift();
                            }
                        }

                        return {
                            ...scorecard,
                            bases,
                            strikes
                        }
                    }
                    return scorecard;
                })
            });
        });
    }

    public undoLastScorecardUpdate(): Promise<void> {
        const toRestore: Scorecard = this.backupScorecards.pop();
        return toRestore && this.updateScorecardForLoadedGame(toRestore.id, toRestore.bases, toRestore.strikes, true);
    }

    public getRankColor(rank: number): string {
        switch (rank) {
            case 1:
                return 'var(--gold)';
            case 2:
                return 'var(--silver)';
            case 3:
                return 'var(--bronze)';
            default:
                return 'var(--black)';
        }
    }

    private generateScorecardLists() {
        const loadedGame = this.getLoadedGameState().getValue();

        //Set up a scorecard for each player
        const scorecardsByPlayerId: { [playerId: number]: Scorecard } = {};
        if (loadedGame && loadedGame.team && loadedGame.team.players) {
            // Add all the existing scorecards
            loadedGame.scorecards && loadedGame.scorecards.forEach(scorecard => {
                if (scorecard && scorecard.player) {
                    scorecardsByPlayerId[scorecard.player.id] = scorecard;
                }
            });
            // Create scorecards for the players who don't have one yet
            // NOTE: id of null represents a blank scorecard that has not been created
            loadedGame.team.players.forEach(player => {
                if (!scorecardsByPlayerId[player.id]) {
                    scorecardsByPlayerId[player.id] = {
                        id: null,
                        bases: 0,
                        strikes: 0,
                        player: player
                    };
                }
            });
        }

        // Broadcast the array of ranked scorecards
        this.rankedScorecardsState.next(
            Object.values(scorecardsByPlayerId).sort((a, b) => {
                if (a.bases === b.bases) {
                    return a.strikes - b.strikes;
                }
                return b.bases - a.bases;
            })
        );

        // Broadcast the array of alphabetical scorecards
        this.alphabeticalScorecardsState.next(
            Object.values(scorecardsByPlayerId).sort((a, b) => {
                if (a && a.player && a.player.name) {
                    return a.player.name.localeCompare(b.player.name);
                }
                return -1;
            })
        );

    }

 }