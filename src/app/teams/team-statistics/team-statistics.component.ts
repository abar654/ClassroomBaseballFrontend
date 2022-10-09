import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { TeamStatisticsService } from "./team-statistics.service";

interface Award {
    title: string,
    recipient: string
}

/**
 * A panel component for displaying statistics about the most recent week/games.
 */

 @Component({
    selector: 'app-team-statistics',
    templateUrl: './team-statistics.component.html',
    styleUrls: ['./team-statistics.component.css']
})
export class TeamStatisticsComponent implements OnInit, OnDestroy {

    private readonly BFAWARD: string = "Best and fairest";
    private readonly MIAWARD: string = "Most improved";

    rankedWeekScores: Scorecard[] = [];
    awards: Award[] = [
        {
            title: this.BFAWARD,
            recipient: ""
        },
        {
            title: this.MIAWARD,
            recipient: ""
        }
    ];

    private subscriptions: Subscription[] = [];

    constructor(
        private teamStatisticsService: TeamStatisticsService
    ){}

    ngOnInit(): void {
        this.subscriptions = [
            this.teamStatisticsService.getRankedWeekScoresState().subscribe((weekScores: Scorecard[]) => {
                if (weekScores != null) {
                    // Check that last week wasn't a week with no scores.
                    let allZero: boolean = true;
                    for (const weekScore of weekScores) {
                        if (weekScore.bases !== 0 || weekScore.strikes !== 0) {
                            allZero = false;
                            break;
                        }
                    }
                    if (allZero) {
                        // There are no statistics to show for the last week
                        this.rankedWeekScores = [];
                    } else {
                        this.rankedWeekScores = weekScores;
                    }
                }
            }),
            this.teamStatisticsService.getBestAndFairestState().subscribe((recipient: string) => {
                this.setAwardRecipient(this.BFAWARD, recipient);
            }),
            this.teamStatisticsService.getMostImprovedState().subscribe((recipient: string) => {
                this.setAwardRecipient(this.MIAWARD, recipient);
            })
        ];
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    private setAwardRecipient(title: string, recipient: string): void {
        this.awards = this.awards.map((award: Award) => {
            if (award.title === title) {
                return {
                    title,
                    recipient
                }
            }
            return award;
        });
    }

}