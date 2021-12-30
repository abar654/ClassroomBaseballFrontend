import { Component, Input } from "@angular/core";
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

    //TODO: Update to display most recent game and players
    //      once we have made models for them.
    @Input()
    teamData: Team;

}