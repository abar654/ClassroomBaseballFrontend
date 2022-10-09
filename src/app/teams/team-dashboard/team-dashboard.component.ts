import { formatDate } from "@angular/common";
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { GamesService } from "src/app/games/games.service";
import { Game } from "src/app/games/models/game.model";
import { HeaderService } from "src/app/header/header.service";
import { Scorecard } from "src/app/scorecards/models/scorecard.model";
import { Team } from "../models/team.model";
import { TeamsService } from "../teams.service";

/**
 * A routable component for displaying information about and managing a team.
 */

@Component({
    selector: 'app-team-dashboard',
    templateUrl: './team-dashboard.component.html',
    styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit, OnDestroy {

    teamData: Team = null;
    mostRecentGame: Game = null;
    recentRankedScorecards: Scorecard[] = [];
    isEditing: boolean = false;

    subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private headerService: HeaderService,
        private teamsService: TeamsService,
        private gamesService: GamesService,
        @Inject(LOCALE_ID) private locale: string
    ){}

    ngOnInit(): void {
        this.route.params.subscribe(async (params: Params) => {

            await this.teamsService.loadTeams();
            this.teamsService.setCurrentTeamById(parseInt(params.teamId));

            this.subscriptions = [
                this.teamsService.getCurrentTeamState().subscribe((team: Team) => {

                    // If teams is still null then data hasn't been loaded yet.
                    const teams = this.teamsService.getTeamsState().getValue();
                    if (teams !== null) {
    
                        this.teamData = team;
                        if (this.teamData !== null) {
    
                            this.headerService.setTitle(this.teamData.name);
    
                            // Load the most recent game, if a game exists.
                            if (this.teamData.games.length > 0) {
                                this.gamesService.loadGame(
                                    this.teamData.id, 
                                    this.teamData.games[this.teamData.games.length - 1].id
                                );
                            } else {
                                this.gamesService.unloadGame();
                            }
    
                        } else {
                            this.router.navigate(['/teams']);
                        }
    
                    }
    
                }),
                this.gamesService.getLoadedGameState().subscribe((game: Game) => {
                    this.mostRecentGame = game;
                }),
                this.gamesService.getRankedScorecardsState().subscribe((scorecards: Scorecard[]) => {
                    this.recentRankedScorecards = scorecards;
                })
            ];
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

    async startNewGame() {
        if (this.teamData) {
            const date = new Date();
            const name = formatDate(date, 'EEEE MMM dd - h:mm a', this.locale);
            try {
                const game: Game = await this.gamesService.createGame(this.teamData.id, name, date.getTime());
                this.router.navigate(['/teams/' + this.teamData.id + '/games/' + game.id]);
            } catch (error) {
                console.log("TeamDashboardComponent - startNewGame - error: ", error);
            }
        }
    }

    continueMostRecentGame() {
        if (this.teamData && this.mostRecentGame) {
            this.router.navigate(['/teams/' + this.teamData.id + '/games/' + this.mostRecentGame.id]);
        }
    }

    showEditForm() {
        this.isEditing = true;
    }

    onCloseModal() {
        this.isEditing = false;
    }

}