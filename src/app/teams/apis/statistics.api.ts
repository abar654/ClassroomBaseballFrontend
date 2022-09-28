import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";

import { environment } from "src/environments/environment";

/**
 * Communicates with the team statistics api on the backend
 */

@Injectable()
export class StatisticsApi {

    private readonly teamsApi = environment.apiEndpoint + '/teams/';
    private readonly statisticsApiExtension = '/statistics';

    constructor(
        private httpClient: HttpClient
    ){}

    public getWeekScores(teamId: number, startTimestamp: number): Observable<Scorecard[]> {
        return this.httpClient.get<Scorecard[]>(this.teamsApi + teamId + this.statisticsApiExtension + '/weekscores/' + startTimestamp);
    }
    
}