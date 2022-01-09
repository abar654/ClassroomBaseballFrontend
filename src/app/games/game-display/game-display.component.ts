import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { GamesService } from "src/app/games/games.service";
import { Game } from "../models/game.model";

/**
 * A routable component for displaying the state of a game.
 */

@Component({
    selector: 'app-game-display',
    templateUrl: './game-display.component.html'
})
export class GameDisplayComponent implements OnInit, OnDestroy {

    gameData: Game = null;

    private gameSub: Subscription = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private gamesService: GamesService
    ){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.gamesService.loadGame(params.teamId, params.gameId).subscribe(
                (game: Game) => {
                    this.gameData = game;
                },
                (error: any) => {
                    console.log("loadGame - error: ", error);
                    this.router.navigate(['/teams/' + params.teamId]);
                }
            );
            this.gameSub = this.gamesService.getLoadedGameState().subscribe((game: Game) => {
                this.gameData = game;
            });
        });
    }

    ngOnDestroy(): void {
        this.gameSub && this.gameSub.unsubscribe();
    }

}