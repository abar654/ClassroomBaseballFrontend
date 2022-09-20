import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Scorecard } from 'src/app/scorecards/models/scorecard.model';
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
    rankedScorecards: Scorecard[] = [];

    private gameSub: Subscription = null;
    private scoresSub: Subscription = null;

    constructor(
        private gamesService: GamesService
    ) {}

    ngOnInit(): void {
        this.gameSub = this.gamesService.getLoadedGameState().subscribe(game => {
            this.displayedGame = game;
        });
        this.scoresSub = this.gamesService.getRankedScorecardsState().subscribe((scorecards: Scorecard[]) => {
            this.rankedScorecards = scorecards;
        });
    }

    ngOnDestroy(): void {
        this.gameSub && this.gameSub.unsubscribe();
        this.scoresSub && this.scoresSub.unsubscribe();
    }

    getRankColor(rank: number): string {
        return this.gamesService.getRankColor(rank);
    }

}
