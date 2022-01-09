import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/players/models/player.model';
import { GamesService } from '../games.service';
import { Game } from '../models/game.model';

/**
 * A panel component for displaying the details of a game.
 */

@Component({
    selector: 'app-game-summary',
    templateUrl: './game-summary.component.html',
    styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent implements OnInit, OnDestroy {

    displayedGame: Game = null;

    private gameSub: Subscription = null;

    constructor(
        private gamesService: GamesService
    ) {}

    ngOnInit(): void {
        this.gameSub = this.gamesService.getLoadedGameState().subscribe(game => {
            this.displayedGame = game;
        })
    }

    ngOnDestroy(): void {
        this.gameSub && this.gameSub.unsubscribe();
    }

}
