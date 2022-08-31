import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { Scorecard } from "../models/scorecard.model";

/**
 * Communicates with the scorecards api on the backend
 */

@Injectable({providedIn: 'root'})
export class ScorecardsApi {

    private readonly teamsApi = environment.apiEndpoint + '/teams/';
    private readonly gamesApiExtension = '/games/';
    private readonly scorecardsApiExtension = '/scorecards';

    constructor(
        private httpClient: HttpClient
    ){}

    public createScorecard(teamId: number, gameId: number, playerId: number, bases: number, strikes: number): Observable<Scorecard> {
        return this.httpClient.post<Scorecard>(
            this.teamsApi + teamId + this.gamesApiExtension + gameId + this.scorecardsApiExtension, 
            {
                bases,
                strikes,
                player: {
                    id: playerId
                }
            }
        );
    }

    public updateScorecard(teamId: number, gameId: number, scorecardId: number, bases: number, strikes: number): Observable<void> {
        return this.httpClient.put<void>(
            this.teamsApi + teamId + this.gamesApiExtension + gameId + this.scorecardsApiExtension + "/" + scorecardId, 
            {
                bases,
                strikes
            }
        );
    }

    public deleteScorecard(teamId: number, gameId: number, scorecardId: number): Observable<void> {
        return this.httpClient.delete<void>(
            this.teamsApi + teamId + this.gamesApiExtension + gameId + this.scorecardsApiExtension + "/" + scorecardId
        );
    }

}