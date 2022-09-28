import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { Team } from "src/app/teams/models/team.model";

/**
 * Data model for a player object
 */

export interface Player {
    id: number,
    name: string,
    color: string,
    team?: Team,
    scorecards?: Scorecard[]
}