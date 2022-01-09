import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GamesApi } from "./apis/games.api";
import { Game } from "./models/game.model";

/**
 * Provides an interface to components for accessing and managing games.
 */

 @Injectable({providedIn: 'root'})
 export class GamesService {

    constructor(
        private gamesApi: GamesApi
    ) {}

    public getGame(teamId: number, gameId: number) {
        return this.gamesApi.getGame(teamId, gameId);
    }

    public createGame(teamId: number, name: string, date: number): Observable<Game> {
        return this.gamesApi.createGame(teamId, name, date);
    }

 }