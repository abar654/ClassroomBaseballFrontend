import { Injectable } from "@angular/core";
import { ScorecardsApi } from "./apis/scorecards.api";
import { Scorecard } from "./models/scorecard.model";

/**
 * Provides an interface for accessing and managing scorecards.
 */

 @Injectable({providedIn: 'root'})
 export class ScorecardsService {

    constructor(
        private scorecardsApi: ScorecardsApi
    ) {}

    public createScorecard(teamId: number, gameId: number, playerId: number, bases: number, strikes: number): Promise<Scorecard> {
        return this.scorecardsApi.createScorecard(
                teamId, 
                gameId, 
                playerId, 
                bases, 
                strikes
            )
            .toPromise();
    }

    public updateScorecard(teamId: number, gameId: number, scorecardId: number, bases: number, strikes: number): Promise<void> {
        return this.scorecardsApi.updateScorecard(
                teamId, 
                gameId, 
                scorecardId, 
                bases, 
                strikes
            )
            .toPromise();
    }

    public deleteScorecard(teamId: number, gameId: number, scorecardId: number): Promise<void> {
        return this.scorecardsApi.deleteScorecard(
                teamId, 
                gameId, 
                scorecardId
            )
            .toPromise();
    }

    public getRankColor(rank: number): string {
        switch (rank) {
            case 1:
                return 'var(--gold)';
            case 2:
                return 'var(--silver)';
            case 3:
                return 'var(--bronze)';
            default:
                return 'var(--black)';
        }
    }

 }