import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { GamesService } from "../games.service";

/**
 * A grid component which displays the players in a team for the purpose of controlling
 * the state of the game.
 */

@Component({
    selector: 'app-game-control',
    templateUrl: './game-control.component.html',
    styleUrls: ['./game-control.component.css']

})
export class GameControlComponent implements OnInit, OnDestroy {

    scorecards: Scorecard[] = [];
    private scoresSub: Subscription = null;

    constructor(
        private gamesService: GamesService
    ){}

    ngOnInit(): void {
        this.scoresSub = this.gamesService.getAlphabeticalScorecardsState().subscribe((scorecards: Scorecard[]) => {
            this.scorecards = scorecards;
        });
    }

    ngOnDestroy(): void {
        this.scoresSub && this.scoresSub.unsubscribe();
    }

    updateScorecard(scorecard: Scorecard, bases: number, strikes: number): void {
        // Clamp scores to correct ranges
        bases = Math.min(4, Math.max(0, bases));
        strikes = Math.min(3, Math.max(0, strikes));

        if (scorecard.bases !== bases || scorecard.strikes !== strikes) {
            if (scorecard.id) {
                this.gamesService.updateScorecardForLoadedGame(scorecard.id, bases, strikes)
                    .catch(error => {
                        console.log("GameControlComponent - updateScorecard - update - error: ", error);
                    });
            } else {
                this.gamesService.createScorecardForLoadedGame(scorecard.player.id, bases, strikes)
                    .catch(error => {
                        console.log("GameControlComponent - updateScorecard - create - error: ", error);
                    });
            }
        }
    }

}