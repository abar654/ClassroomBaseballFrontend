import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlayersApi } from "./apis/players.api";
import { Player } from "./models/player.model";

/**
 * Provides an interface to components for accessing and managing players.
 */

 @Injectable({providedIn: 'root'})
 export class PlayersService {

    constructor(
        private playersApi: PlayersApi
    ) {}

    public createPlayer(teamId: number, name: string, color: string): Observable<Player> {
        return this.playersApi.createPlayer(teamId, name, color);
    }

    public updatePlayer(teamId: number, playerId: number, name: string, color: string): Observable<void> {
        return this.playersApi.updatePlayer(teamId, playerId, name, color);
    }

    public deletePlayer(teamId: number, playerId: number): Observable<void> {
        return this.playersApi.deletePlayer(teamId, playerId);
    }

 }