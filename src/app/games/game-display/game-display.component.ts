import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GamesService } from "src/app/games/games.service";
import { Game } from "../models/game.model";

/**
 * A routable component for displaying the state of a game.
 */

@Component({
    selector: 'app-game-display',
    templateUrl: './game-display.component.html'
})
export class GameDisplayComponent implements OnInit {

    gameData: Game = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private gamesService: GamesService
    ){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.gamesService.getGame(params.teamId, params.gameId).subscribe((game: Game) => {
                this.gameData = game;
            });
        });
    }

}