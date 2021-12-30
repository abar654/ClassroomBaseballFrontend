/**
 * Data model for a team object
 */

 export interface Team {
    id: number,
    name: string,
    image: string,
    players: any[], // TODO: Add players and games as the proper interfaces (with potential optional fields)
    games: any[] 
}