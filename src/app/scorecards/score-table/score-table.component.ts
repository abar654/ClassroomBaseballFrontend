import { Component, Input } from '@angular/core';
import { Scorecard } from 'src/app/scorecards/models/scorecard.model';
import { ScorecardsService } from '../scorecards.service';

/**
 * A panel component for displaying scores in a table format.
 */

@Component({
    selector: 'app-score-table',
    templateUrl: './score-table.component.html',
    styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {

    @Input()
    rankedScorecards: Scorecard[] = [];

    constructor(
        private scorecardsService: ScorecardsService
    ) {}

    getRankColor(rank: number): string {
        return this.scorecardsService.getRankColor(rank);
    }

}
