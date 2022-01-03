import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { Player } from "../models/player.model";

/**
 * Communicates with the players api on the backend
 */

@Injectable({providedIn: 'root'})
export class PlayersApi {

    private readonly teamsApi = environment.apiEndpoint + '/teams/';
    private readonly playersApiExtension = '/players';

    constructor(
        private httpClient: HttpClient
    ){}

    public createPlayer(teamId: number, name: string, color: string): Observable<Player> {
        return this.httpClient.post<Player>(this.teamsApi + teamId + this.playersApiExtension, {
            name: name,
            color: color
        });
    }

    public updatePlayer(teamId: number, playerId: number, name: string, color: string): Observable<void> {
        return this.httpClient.put<void>(
            this.teamsApi + teamId + this.playersApiExtension + "/" + playerId, 
            {
                name: name,
                color: color
            }
        );
    }

}