import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { GamesService } from "../games.service";

/**
 * A panel component for displaying the state of the game as a leaderboard table.
 */

@Component({
    selector: 'app-game-leaderboard',
    templateUrl: './game-leaderboard.component.html',
    styleUrls: ['./game-leaderboard.component.css']
})
export class GameLeaderboardComponent implements OnInit, OnDestroy {

    rankedScorecards: Scorecard[] = [];
    private scoresSub: Subscription = null;

    constructor(
        private gamesService: GamesService
    ){}

    ngOnInit(): void {
        this.scoresSub = this.gamesService.getRankedScorecardsState().subscribe((scorecards: Scorecard[]) => {
            this.rankedScorecards = scorecards;
        });
    }

    ngOnDestroy(): void {
        this.scoresSub && this.scoresSub.unsubscribe();
    }

    setBases(scorecard: Scorecard, bases: number): void {
        if (scorecard.bases === bases) {
            bases--;
        }
        this.updateScorecard(scorecard, bases, scorecard.strikes);
    }

    setStrikes(scorecard: Scorecard, strikes: number): void {
        if (scorecard.strikes === strikes) {
            strikes--;
        }
        this.updateScorecard(scorecard, scorecard.bases, strikes);
    }

    updateScorecard(scorecard: Scorecard, bases: number, strikes: number): void {
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

    getRankColor(rank: number): string {
        return this.gamesService.getRankColor(rank);
    }

}