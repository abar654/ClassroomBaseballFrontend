import { Game } from "src/app/games/models/game.model";
import { Player } from "src/app/players/models/player.model";

/**
 * Data model for a team object.
 */

 export interface Team {
    id: number,
    name: string,
    image: string,
    players?: Player[], 
    games?: Game[]
}