import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { GamesApi } from "./apis/games.api";
import { Game } from "./models/game.model";

/**
 * Provides an interface to components for accessing and managing games.
 */

 @Injectable({providedIn: 'root'})
 export class GamesService {

    private loadedGameState: BehaviorSubject<Game> = new BehaviorSubject<Game>(null);

    constructor(
        private gamesApi: GamesApi
    ) {}

    public getLoadedGameState(): BehaviorSubject<Game> {
        return this.loadedGameState;
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

 }