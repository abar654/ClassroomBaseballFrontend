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

    private teamsState: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

    constructor(
        private teamsApi: TeamsApi,
        private playersService: PlayersService
    ) {}

    reload() {
        this.loadTeams();
    }

    private loadTeams(): void {
        this.teamsApi.getTeams().subscribe(
            (teams: Team[]) => {
                this.teamsState.next(teams);
            },
            (error: any) => {
                console.log("loadTeams - error: ", error);
            }
        );
    }

    public getTeamsState(): BehaviorSubject<Team[]> {
        return this.teamsState;
    }

    public createTeam(name: string = null, image: string = null): Observable<Team> {
        return this.teamsApi.createTeam(name, image)
            .pipe(
                tap(() => this.loadTeams())
            );
    }

    public updateTeam(id: number, name: string = null, image: string = null): Observable<void> {
        return this.teamsApi.updateTeam(id, name, image)
            .pipe(
                tap(() => this.loadTeams())
            );
    }

    public deleteTeam(id: number): Observable<void> {
        return this.teamsApi.deleteTeam(id)
            .pipe(
                tap(() => this.loadTeams())
            );
    }

    public createPlayerOnTeam(teamId: number, name: string = null, color: string = null): Observable<Player> {
        return this.playersService.createPlayer(teamId, name, color)
            .pipe(
                tap(() => this.loadTeams())
            );
    }

    public updatePlayerOnTeam(teamId: number, playerId: number, name: string, color: string) {
        return this.playersService.updatePlayer(teamId, playerId, name, color)
            .pipe(
                tap(() => this.loadTeams())
            );
    }

    public deletePlayerOnTeam(teamId: number, playerId: number) {
        return this.playersService.deletePlayer(teamId, playerId)
            .pipe(
                tap(() => this.loadTeams())
            );
    }

 }