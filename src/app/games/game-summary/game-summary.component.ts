import { Component, Input, OnInit } from '@angular/core';
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
export class GameSummaryComponent implements OnInit {

    @Input()
    set game(gameValue: Game) {
        if (gameValue && gameValue.team) {
            this.gamesService.getGame(gameValue.team.id, gameValue.id).subscribe(game => {
                this.displayedGame = game;
                // TODO: Sort players by score! (runs then strikes)
                this.players = gameValue.team.players;
            });
        }
    };

    displayedGame: Game = null;
    players: Player[] = null;

    constructor(
        private gamesService: GamesService
    ) {}

    ngOnInit(): void {

    }

}
