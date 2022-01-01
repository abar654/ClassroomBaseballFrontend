import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { TeamsApi } from "./apis/teams.api";
import { Team } from "./models/team.model";

/**
 * Provides an interface to components for accessing and managing teams.
 */

 @Injectable()
 export class TeamsService {

    public teamsState: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

    constructor(
        private teamsApi: TeamsApi
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

    public createPlayerOnTeam(id: number) {
        // Use playerService here!!!
        // Remember to reload Teams after the update
        /*
        return this.playerService.addPlayer(id, name, color)
            .pipe(
                tap(() => this.loadTeams())
            );
        */
    }

 }