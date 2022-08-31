import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { Team } from "src/app/teams/models/team.model";

/**
 * Data model for a game object.
 */

export interface Game {
    id: number,
    name: string,
    date: number,
    team?: Team,
    scorecards?: Scorecard[]
}