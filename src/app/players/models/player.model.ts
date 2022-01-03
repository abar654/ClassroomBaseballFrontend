import { Team } from "src/app/teams/models/team.model";

/**
 * Data model for a player object
 */

export interface Player {
    id: number,
    name: string,
    color: string,
    team?: Team,
    scorecards?: any[] // TODO: Add scorecards as the proper interface (with potential optional fields)
}