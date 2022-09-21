import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { Game } from "../models/game.model";

/**
 * Communicates with the games api on the backend
 */

@Injectable({providedIn: 'root'})
export class GamesApi {

    private readonly teamsApi = environment.apiEndpoint + '/teams/';
    private readonly gamesApiExtension = '/games';

    constructor(
        private httpClient: HttpClient
    ){}

    public getGame(teamId: number, gameId: number): Observable<Game> {
        return this.httpClient.get<Game>(this.teamsApi + teamId + this.gamesApiExtension + '/' + gameId);
    }

    public createGame(teamId: number, name: string, date: number): Observable<Game> {
        return this.httpClient.post<Game>(this.teamsApi + teamId + this.gamesApiExtension, {
            name: name,
            date: date
        });
    }

    public updateGame(teamId: number, gameId: number, name: string, date: number): Observable<void> {
        return this.httpClient.put<void>(
            this.teamsApi + teamId + this.gamesApiExtension + "/" + gameId, 
            {
                name: name,
                date: date
            }
        );
    }

    public deleteGame(teamId: number, gameId: number): Observable<void> {
        return this.httpClient.delete<void>(this.teamsApi + teamId + this.gamesApiExtension + "/" + gameId);
    }

}