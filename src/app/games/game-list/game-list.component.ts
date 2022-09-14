import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';
import { Game } from '../models/game.model';

/**
 * A panel component for displaying a list of games.
 */

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {

    @Input()
    games: Game[];

    constructor(
        private gamesService: GamesService,
        private router: Router
    ) {}

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    continueGame(game: Game) {
        // Use the current loaded game to get the team id
        // because we only show the games for the same team.
        const loadedGame = this.gamesService.getLoadedGameState().value;
        if (this.games && loadedGame && loadedGame.team) {
            this.router.navigate(['/teams/' + loadedGame.team.id + '/games/' + game.id]);
        }
    }

}
