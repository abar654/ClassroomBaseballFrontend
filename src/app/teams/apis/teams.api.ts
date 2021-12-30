import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { Team } from "../models/team.model";

/**
 * Communicates with the teams api on the backend
 */

@Injectable()
export class TeamsApi {

    private readonly teamsApi = environment.apiEndpoint + '/teams';

    constructor(
        private httpClient: HttpClient
    ){}

    public getTeams(): Observable<Team[]> {
        return this.httpClient.get<Team[]>(this.teamsApi);
    }

}