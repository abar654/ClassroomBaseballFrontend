import { Game } from "src/app/games/models/game.model";
import { Player } from "src/app/players/models/player.model";

/**
 * Data model for a scorecard object
 */

export interface Scorecard {
    id: number,
    bases: number,
    strikes: number,
    game?: Game,
    player?: Player
}