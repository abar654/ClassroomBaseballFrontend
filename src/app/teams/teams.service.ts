import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Player } from "../players/models/player.model";
import { PlayersService } from "../players/players.service";
import { TeamsApi } from "./apis/teams.api";
import { Team } from "./models/team.model";

/**
 * Provides an interface to components for accessing and managing teams.
 */

 @Injectable()
 export class TeamsService {

    // A value of null signifies that the teamsState has not yet been loaded
    // (otherwise the value will be an array, though possibly empty if no teams exist).
    private teamsState: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>(null);
    
    private currentTeamState: BehaviorSubject<Team> = new BehaviorSubject<Team>(null);

    constructor(
        private teamsApi: TeamsApi,
        private playersService: PlayersService
    ) {}

    public getTeamsState(): BehaviorSubject<Team[]> {
        return this.teamsState;
    }

    public getCurrentTeamState(): BehaviorSubject<Team> {
        return this.currentTeamState;
    }

    public loadTeams(): void {
        this.teamsApi.getTeams().subscribe(
            this.updateTeamsState.bind(this),
            (error: any) => {
                console.log("loadTeams - error: ", error);
            }
        );
    }

    private updateTeamsState(teams: Team[]) {
        // Update the teams list
        this.teamsState.next(teams);

        // Update the current team
        const currentTeam = this.currentTeamState.getValue()
        currentTeam && this.setCurrentTeamById(currentTeam.id);
    }

    public setCurrentTeamById(teamId: number): void {
        const teams = this.teamsState.getValue() || [];
        const currentTeam = teams.find(team => team.id === teamId) || null;
        this.currentTeamState.next(currentTeam);
    }

    public createTeam(name: string = null, image: string = null): Promise<Team> {
        return this.teamsApi.createTeam(name, image)
            .pipe(
                tap((team: Team) => {
                    const teams = this.teamsState.getValue() || [];
                    this.updateTeamsState([...teams, team]);
                })
            )
            .toPromise();
    }

    public updateTeam(id: number, name: string = null, image: string = null): Promise<void> {
        return this.teamsApi.updateTeam(id, name, image)
            .pipe(
                tap(() => {
                    const teams = this.teamsState.getValue();
                    teams && this.updateTeamsState(teams.map(team => {
                        if (team.id === id) {
                            return {
                                ...team,
                                name,
                                image
                            };
                        }
                        return team;
                    }));
                })
            )
            .toPromise();
    }

    public deleteTeam(id: number): Promise<void> {
        return this.teamsApi.deleteTeam(id)
            .pipe(
                tap(() => {
                    const teams = this.teamsState.getValue();
                    teams && this.updateTeamsState(teams.filter(team => team.id !== id));
                })
            )
            .toPromise();
    }

    public createPlayerOnCurrentTeam(name: string = null, color: string = null): Promise<Player> {
        const currentTeam = this.getCurrentTeamState().getValue();
        return currentTeam && this.playersService.createPlayer(currentTeam.id, name, color)
            .pipe(
                tap((player: Player) => {
                    this.updatePlayersForTeam(currentTeam.id, (players: Player[]) => {
                        return [...players, player];
                    });
                })
            )
            .toPromise();
    }

    public updatePlayerOnCurrentTeam(playerId: number, name: string, color: string): Promise<void> {
        const currentTeam = this.getCurrentTeamState().getValue();
        return currentTeam && this.playersService.updatePlayer(currentTeam.id, playerId, name, color)
            .pipe(
                tap(() => {
                    this.updatePlayersForTeam(currentTeam.id, (players: Player[]) => {
                        return players.map(player => {
                            if (player.id === playerId) {
                                return {
                                    ...player,
                                    name,
                                    color
                                }
                            }
                            return player;
                        });
                    });
                })
            )
            .toPromise();
    }

    public deletePlayerOnCurrentTeam(playerId: number): Promise<void> {
        const currentTeam = this.getCurrentTeamState().getValue();
        return currentTeam && this.playersService.deletePlayer(currentTeam.id, playerId)
            .pipe(
                tap(() => {
                    this.updatePlayersForTeam(currentTeam.id, (players: Player[]) => {
                        return players.filter(player => player.id !== playerId);
                    });
                })
            )
            .toPromise();
    }

    private updatePlayersForTeam(teamId: number, updateFunction: (players: Player[]) => Player[]) {
        const teams = this.teamsState.getValue();
        teams && this.updateTeamsState(teams.map(team => {
            if (team.id === teamId && team.players) {
                return {
                    ...team,
                    players: updateFunction(team.players)
                };
            }
            return team;
        }));
    }

 }