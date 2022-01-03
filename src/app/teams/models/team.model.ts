import { Player } from "src/app/players/models/player.model";

/**
 * Data model for a team object
 */

 export interface Team {
    id: number,
    name: string,
    image: string,
    players?: Player[], 
    games?: any[] // TODO: Add games as the proper interface (with potential optional fields)
}