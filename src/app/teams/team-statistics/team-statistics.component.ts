import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { GamesService } from "src/app/games/games.service";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { TeamStatisticsService } from "./team-statistics.service";

/**
 * A panel component for displaying statistics about the most recent week/games.
 */

 @Component({
    selector: 'app-team-statistics',
    templateUrl: './team-statistics.component.html',
    styleUrls: ['./team-statistics.component.css']
})
export class TeamStatisticsComponent implements OnInit, OnDestroy {

    rankedWeekScores: Scorecard[] = [];

    private weekScoresStateSub: Subscription;

    constructor(
        private teamStatisticsService: TeamStatisticsService,
        private gamesService: GamesService
    ){}

    ngOnInit(): void {
        this.weekScoresStateSub = this.teamStatisticsService.getRankedWeekScoresState()
            .subscribe((weekScores: Scorecard[]) => {
                if (weekScores != null) {
                    this.rankedWeekScores = weekScores;
                }
            });
    }

    ngOnDestroy(): void {
        this.weekScoresStateSub && this.weekScoresStateSub.unsubscribe();
    }

    // TO REMOVE WHEN USING GAMESUMMARYCOMPONENT
    getRankColor(rank: number): string {
        return this.gamesService.getRankColor(rank);
    }

}