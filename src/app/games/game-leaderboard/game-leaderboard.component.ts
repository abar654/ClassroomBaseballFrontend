import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";
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
    rankedScorecards: Scorecard[] = [];
    private gameSub: Subscription = null;
    private scoresSub: Subscription = null;

    constructor(
        private gamesService: GamesService
    ){}

    ngOnInit(): void {
        this.gameSub = this.gamesService.getLoadedGameState().subscribe((game: Game) => {
            this.gameData = game;
        });
        this.scoresSub = this.gamesService.getRankedScorecardsState().subscribe((scorecards: Scorecard[]) => {
            this.rankedScorecards = scorecards;
        });
    }

    ngOnDestroy(): void {
        this.gameSub && this.gameSub.unsubscribe();
        this.scoresSub && this.scoresSub.unsubscribe();
    }

    updateScorecard(scorecard: Scorecard, bases: number, strikes: number) {
        if (scorecard.id) {
            this.gamesService.updateScorecardForLoadedGame(scorecard.id, bases, strikes)
                .catch(error => {
                    console.log("GameLeaderboardComponent - updateScorecard - update - error: ", error);
                });
        } else {
            this.gamesService.createScorecardForLoadedGame(scorecard.player.id, bases, strikes)
                .catch(error => {
                    console.log("GameLeaderboardComponent - updateScorecard - create - error: ", error);
                });
        }
    }

}