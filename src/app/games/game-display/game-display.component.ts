import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { GamesService } from "src/app/games/games.service";
import { HeaderLink } from "src/app/header/header-link.model";
import { HeaderService } from "src/app/header/header.service";
import { PopupService } from "src/app/shared/popup/popup.service";
import { Game } from "../models/game.model";

/**
 * A routable component for displaying the state of a game.
 */

@Component({
    selector: 'app-game-display',
    templateUrl: './game-display.component.html',
    styleUrls: ['./game-display.component.css']

})
export class GameDisplayComponent implements OnInit, OnDestroy {

    gameData: Game = null;
    nameInput: string = "";

    private gameSub: Subscription = null;

    private deleteLink: HeaderLink = {
        labelHtml: '<span class="material-symbols-outlined">delete</span>',
        priority: 10,
        onClick: () => {
            this.deleteGame();
        }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private headerService: HeaderService,
        private gamesService: GamesService,
        private popupService: PopupService
    ){}

    ngOnInit(): void {
        this.headerService.addLink(this.deleteLink);

        this.route.params.subscribe(async (params: Params) => {
            try {
                await this.gamesService.loadGame(params.teamId, params.gameId);
                this.gameSub = this.gamesService.getLoadedGameState().subscribe((game: Game) => {
                    if (game) {
                        this.gameData = game;
                        this.nameInput = game.name;
                    } else {
                        this.router.navigate(['/teams/' + params.teamId]);
                    }
                });
            } catch (error: any) {
                console.log("GameDisplayComponent - loadGame - error: ", error);
                this.router.navigate(['/teams/' + params.teamId]);
            }
        });
    }

    ngOnDestroy(): void {
        this.headerService.removeLink(this.deleteLink);
        this.gameSub && this.gameSub.unsubscribe();
    }

    saveName(): void {
        if (this.gameData && this.gameData.team) {
            this.gamesService.updateGame(
                this.gameData.team.id, 
                this.gameData.id, 
                this.nameInput, 
                this.gameData.date
            );
        }         
    }

    deleteGame(): void {
        this.popupService.show({
            message: "Are you sure you want to delete this game?",
            dismissable: false,
            buttons: [
                {
                    label: "Delete",
                    onClick: () => {
                        if (this.gameData && this.gameData.team) {
                            this.gamesService.deleteGame(
                                this.gameData.team.id, 
                                this.gameData.id
                            );
                        }
                    }
                },
                {
                    label: "Cancel",
                    onClick: () => {}
                }
            ]
        });
    }

}