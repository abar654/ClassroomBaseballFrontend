import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Player } from "src/app/players/models/player.model";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { StatisticsApi } from "../apis/statistics.api";
import { Team } from "../models/team.model";
import { TeamsService } from "../teams.service";

interface PlayerScore {
    player: Player,
    score: number
}

/**
 * A business logic service for processing and providing various team statistics.
 */

 @Injectable()
 export class TeamStatisticsService {

    private readonly WEEK_DURATION: number = 7 * 24 * 60 * 60 * 1000;

    private rankedWeekScores: BehaviorSubject<Scorecard[]> = new BehaviorSubject<Scorecard[]>([]);
    private bestAndFairest: BehaviorSubject<string> = new BehaviorSubject<string>("");
    private mostImproved: BehaviorSubject<string> = new BehaviorSubject<string>("");

    constructor(
        private teamsService: TeamsService,
        private statisticsApi: StatisticsApi
    ) {
        this.teamsService.getCurrentTeamState().subscribe((team: Team) => {
            if (team != null) {
                // Fetch the statistics for the current team
                const startTimestamp: number = this.getStartOfWeekTimestamp(new Date().getTime() - this.WEEK_DURATION);
                this.statisticsApi.getWeekScores(team.id, startTimestamp).subscribe(
                    (weekScores: Scorecard[]) => {
                        // Broadcast the sorted week scores
                        this.rankedWeekScores.next(weekScores.sort((a, b) => {
                            if (a.bases === b.bases) {
                                return a.strikes - b.strikes;
                            }
                            return b.bases - a.bases;
                        }));

                        this.bestAndFairest.next(this.getBestAndFairest(weekScores));

                        this.statisticsApi.getWeekScores(
                            team.id, 
                            startTimestamp - this.WEEK_DURATION
                        ).subscribe((earlierWeekScores: Scorecard[]) => {
                            this.mostImproved.next(this.getMostImproved(earlierWeekScores, weekScores));
                        });
                    },
                    (error: any) => {
                        console.log("loadStatistics - error: ", error);
                    }
                ); 
            }           
        });
    }

    getRankedWeekScoresState(): BehaviorSubject<Scorecard[]> {
        return this.rankedWeekScores;
    }

    getBestAndFairestState(): BehaviorSubject<string> {
        return this.bestAndFairest;
    }

    getMostImprovedState(): BehaviorSubject<string> {
        return this.mostImproved;
    }

    /**
     * Calculates the best and fairest player and returns their name.
     * Best and fairest is the player with the greatest "bases - strikes" score.
     */
    private getBestAndFairest(weekScores: Scorecard[]): string {
        const playerScores: PlayerScore[] = [];
        for (const weekScore of weekScores) {
            playerScores.push({
                player: weekScore.player,
                score: weekScore.bases - weekScore.strikes
            });     
        }
        return this.getRandomBestPlayerName(playerScores);
    }

    /**
     * Calculates the most improved player and returns their name.
     * Most improved is the player with the greatest increase in their "bases - strikes" score
     * from earlierWeekScores to weekScores.
     */
    private getMostImproved(earlierWeekScores: Scorecard[], weekScores: Scorecard[]): string {
        const earlierScores: { [playerId: number]: number } = {};
        for (const earlierWeekScore of earlierWeekScores) {
            earlierScores[earlierWeekScore.player.id] = earlierWeekScore.bases - earlierWeekScore.strikes;
        }

        const playerScores: PlayerScore[] = [];
        for (const weekScore of weekScores) {
            if (earlierScores[weekScore.player.id] !== undefined) {
                playerScores.push({
                    player: weekScore.player,
                    score: weekScore.bases - weekScore.strikes - earlierScores[weekScore.player.id]
                });
            }  
        }
        return this.getRandomBestPlayerName(playerScores);
    }

    /**
     * Returns a random player name from among the players with the top score
     */
    private getRandomBestPlayerName(playerScores: PlayerScore[]): string {
        let topScore: number = Number.MIN_SAFE_INTEGER;
        let topNames: string[] = [""];
        for (const playerScore of playerScores) {
            if (playerScore.score > topScore) {
                topScore = playerScore.score;
                topNames = [playerScore.player.name];
            } else if (playerScore.score === topScore) {
                topNames.push(playerScore.player.name);
            }
        }

        // Return a random player from the top names
        // (This way if there are ties then all players may get a chance to be displayed)
        return topNames[Math.floor(Math.random() * topNames.length)];
    }

    /**
     * Calculates the timestamp for the start of the week which contains the given timestamp.
     */
    private getStartOfWeekTimestamp(timestamp: number): number {
        const startOfWeek: Date =  new Date(timestamp);

        // Set date to Sunday
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        // Set hours, minutes, seconds and millis to 0
        startOfWeek.setHours(0);
        startOfWeek.setMinutes(0);
        startOfWeek.setSeconds(0);
        startOfWeek.setMilliseconds(0);

        return startOfWeek.getTime();
    }

 }