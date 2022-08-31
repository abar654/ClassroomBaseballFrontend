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

    constructor(
        private gamesService: GamesService
    ){}

    ngOnInit(): void {
        this.gameSub = this.gamesService.getLoadedGameState().subscribe((game: Game) => {
            this.gameData = game;
            this.prepareScorecards();
        });
    }

    ngOnDestroy(): void {
        this.gameSub && this.gameSub.unsubscribe();
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

    private prepareScorecards() {
        //Set up a scorecard for each player
        const scorecardsByPlayerId: { [playerId: number]: Scorecard } = {};
        if (this.gameData && this.gameData.team && this.gameData.team.players) {
            // Add all the existing scorecards
            this.gameData.scorecards && this.gameData.scorecards.forEach(scorecard => {
                if (scorecard && scorecard.player) {
                    scorecardsByPlayerId[scorecard.player.id] = scorecard;
                }
            });
            // Create scorecards for the players who don't have one yet
            this.gameData.team.players.forEach(player => {
                if (!scorecardsByPlayerId[player.id]) {
                    scorecardsByPlayerId[player.id] = {
                        id: null,
                        bases: 0,
                        strikes: 0,
                        player: player
                    };
                }
            });
        }

        // Prepare the array of ranked scorecards
        this.rankedScorecards = Object.values(scorecardsByPlayerId).sort((a, b) => {
            if (a.bases === b.bases) {
                return a.strikes - b.strikes;
            }
            return b.bases - a.bases;
        });
    }

}