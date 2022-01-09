import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { GamesApi } from "./apis/games.api";
import { Game } from "./models/game.model";

/**
 * Provides an interface to components for accessing and managing games.
 */

 @Injectable({providedIn: 'root'})
 export class GamesService {

    private loadedGameState: BehaviorSubject<Game> = new BehaviorSubject<Game>(null);

    constructor(
        private gamesApi: GamesApi
    ) {}

    public getLoadedGameState(): BehaviorSubject<Game> {
        return this.loadedGameState;
    }

    public loadGame(teamId: number, gameId: number): Observable<Game> {
        return this.gamesApi.getGame(teamId, gameId)
            .pipe(
                tap((game: Game) => {
                    this.loadedGameState.next(game);
                })
            );
    }

    public createGame(teamId: number, name: string, date: number): Observable<Game> {
        return this.gamesApi.createGame(teamId, name, date);
    }

 }