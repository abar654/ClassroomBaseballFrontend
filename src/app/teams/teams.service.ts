import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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

    private loadTeams() {
        this.teamsApi.getTeams().subscribe(
            (teams: Team[]) => {
                this.teamsState.next(teams);
            },
            (error: any) => {
                console.log("loadTeams - error: ", error);
            }
        );
    }

 }