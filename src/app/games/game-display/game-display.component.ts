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
    nameInputValue: string = "";
    nameFocus: boolean = false;
    isControlMode: boolean = false;

    private gameSub: Subscription = null;

    private deleteLink: HeaderLink = {
        labelHtml: '<span class="material-symbols-outlined">delete</span>',
        priority: 8,
        onClick: () => {
            this.deleteGame();
        }
    };

    private controlLink: HeaderLink = {
        labelHtml: '<span class="material-symbols-outlined">sports_esports</span>',
        priority: 9,
        onClick: () => {
            this.isControlMode = true;
            this.headerService.removeLink(this.controlLink);
            this.headerService.addLink(this.displayLink);
        }
    };

    private displayLink: HeaderLink = {
        labelHtml: '<span class="material-symbols-outlined">nest_display</span>',
        priority: 9,
        onClick: () => {
            this.isControlMode = false;
            this.headerService.removeLink(this.displayLink);
            this.headerService.addLink(this.controlLink);
        }
    };

    private undoLink: HeaderLink = {
        labelHtml: '<span class="material-symbols-outlined">undo</span>',
        priority: 10,
        onClick: () => {
            this.gamesService.undoLastScorecardUpdate();
        }
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private headerService: HeaderService,
        private gamesService: GamesService,
        private popupService: PopupService
    ){}

    ngOnInit(): void {
        this.route.params.subscribe(async (params: Params) => {
            try {
                await this.gamesService.loadGame(params.teamId, params.gameId);
                this.gameSub = this.gamesService.getLoadedGameState().subscribe((game: Game) => {
                    if (game) {
                        this.gameData = game;
                        this.nameInputValue = game.name;

                        this.headerService.addLink(this.deleteLink);
                        this.headerService.addLink(this.isControlMode ? this.displayLink : this.controlLink);
                        this.headerService.addLink(this.undoLink);

                        if (game.team) {
                            this.headerService.setTitle(game.team.name);
                        }
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
        this.headerService.removeLink(this.controlLink);
        this.headerService.removeLink(this.displayLink);
        this.headerService.removeLink(this.undoLink);
        this.gameSub && this.gameSub.unsubscribe();
    }

    setGameNameFocus(isFocused: boolean): void {
        this.nameFocus = isFocused;
    }

    isEditingName(): boolean {
        return this.nameFocus || this.nameInputValue !== this.gameData.name;
    }

    saveName(): void {
        if (this.gameData && this.gameData.team) {
            this.gamesService.updateGame(
                this.gameData.team.id, 
                this.gameData.id, 
                this.nameInputValue, 
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