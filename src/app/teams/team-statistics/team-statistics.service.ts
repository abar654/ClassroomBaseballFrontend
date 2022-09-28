import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { StatisticsApi } from "../apis/statistics.api";
import { Team } from "../models/team.model";
import { TeamsService } from "../teams.service";

/**
 * A business logic service for processing and providing various team statistics.
 */

 @Injectable()
 export class TeamStatisticsService {

    private readonly WEEK_DURATION: number = 7 * 24 * 60 * 60 * 1000;

    private rankedWeekScores: BehaviorSubject<Scorecard[]> = new BehaviorSubject<Scorecard[]>([]);

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
                        this.rankedWeekScores.next(weekScores.sort((a, b) => {
                            if (a.bases === b.bases) {
                                return a.strikes - b.strikes;
                            }
                            return b.bases - a.bases;
                        }));
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