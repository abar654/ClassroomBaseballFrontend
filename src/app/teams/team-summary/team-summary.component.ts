import { formatDate } from "@angular/common";
import { Component, Inject, Input, LOCALE_ID } from "@angular/core";
import { Game } from "src/app/games/models/game.model";
import { Team } from "../models/team.model";

/**
 * A card component which displays basic summary info about a team.
 */

@Component({
    selector: 'app-team-summary',
    templateUrl: './team-summary.component.html',
    styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent {

    @Input()
    teamData: Team;

    constructor(
        @Inject(LOCALE_ID) private locale: string
    ){}

    getMostRecentGameString(): string {
        if (this.teamData && this.teamData.games && this.teamData.games.length > 0) {
            let latestDate = 0;
            this.teamData.games.forEach((game: Game) => {
                if (game.date > latestDate) {
                    latestDate = game.date;
                }
            });
            return "Most recent game: " + formatDate(latestDate, 'dd/MM/yyyy', this.locale);
        }
        return "No recent games";
    }

}