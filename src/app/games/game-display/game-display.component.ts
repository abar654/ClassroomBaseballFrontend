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
        this.route.params.subscribe(async (params: Params) => {
            try {
                await this.gamesService.loadGame(params.teamId, params.gameId);
                this.gameSub = this.gamesService.getLoadedGameState().subscribe((game: Game) => {
                    this.gameData = game;
                });
            } catch (error: any) {
                console.log("GameDisplayComponent - loadGame - error: ", error);
                this.router.navigate(['/teams/' + params.teamId]);
            }
        });
    }

    ngOnDestroy(): void {
        this.gameSub && this.gameSub.unsubscribe();
    }

}