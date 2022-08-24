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

    public createPlayer(teamId: number, name: string, color: string): Promise<Player> {
        return this.playersApi.createPlayer(teamId, name, color).toPromise();
    }

    public updatePlayer(teamId: number, playerId: number, name: string, color: string): Promise<void> {
        return this.playersApi.updatePlayer(teamId, playerId, name, color).toPromise();
    }

    public deletePlayer(teamId: number, playerId: number): Promise<void> {
        return this.playersApi.deletePlayer(teamId, playerId).toPromise();
    }

 }