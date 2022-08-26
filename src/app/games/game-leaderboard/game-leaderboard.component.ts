import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Player } from "src/app/players/models/player.model";
import { GamesService } from "../games.service";
import { Game } from "../models/game.model";

/**
 * A panel component for displaying the state of the game as a leaderboard table.
 */

@Component({
    selector: 'app-game-leaderboard',
    templateUrl: './game-leaderboard.component.html',
    styleUrls: ['./game-leaderboard.component.css']

})
export class GameLeaderboardComponent implements OnInit, OnDestroy {

    gameData: Game = null;
    private gameSub: Subscription = null;

    constructor(
        private gamesService: GamesService
    ){}

    ngOnInit(): void {
        this.gameSub = this.gamesService.getLoadedGameState().subscribe((game: Game) => {
            this.gameData = game;
        });
    }

    ngOnDestroy(): void {
        this.gameSub && this.gameSub.unsubscribe();
    }

    // TODO: Change this (and dependant html) to be getRankedScorecards
    getRankedPlayers(): Player[] {
        // TODO: Add ranking based on scorecards
        if (this.gameData && this.gameData.team && this.gameData.team.players) {
            return this.gameData.team.players;
        }
        return [];
    }

}