import { formatDate } from "@angular/common";
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { GamesService } from "src/app/games/games.service";
import { Game } from "src/app/games/models/game.model";
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
    isEditing: boolean = false;

    private currentTeamStateSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private teamsService: TeamsService,
        private gamesService: GamesService,
        @Inject(LOCALE_ID) private locale: string
    ){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {

            this.teamsService.loadTeams();
            this.teamsService.setCurrentTeamById(parseInt(params.teamId));

            this.currentTeamStateSub = this.teamsService.getCurrentTeamState().subscribe((team: Team) => {

                // If teams is still null then data hasn't been loaded yet.
                const teams = this.teamsService.getTeamsState().getValue();
                if (teams !== null) {

                    this.teamData = team;
                    if (this.teamData !== null) {

                        // Load the most recent game, if a game exists.
                        if (this.teamData.games.length > 0) {
                            this.gamesService.loadGame(
                                this.teamData.id, 
                                this.teamData.games[this.teamData.games.length - 1].id
                            ).subscribe();
                        } else {
                            this.gamesService.unloadGame();
                        }

                    } else {
                        this.router.navigate(['/teams']);
                    }

                }

            });
        });
    }

    ngOnDestroy(): void {
        this.currentTeamStateSub && this.currentTeamStateSub.unsubscribe();
    }

    startNewGame() {
        if (this.teamData) {
            const date = new Date();
            const name = formatDate(date, 'EEEE h:mm a', this.locale);
            this.gamesService.createGame(this.teamData.id, name, date.getTime()).subscribe(game => {
                this.router.navigate(['/teams/' + this.teamData.id + '/games/' + game.id]);
            });
        }
    }

    continueMostRecentGame() {
        const mostRecentGame = this.gamesService.getLoadedGameState().value;
        if (this.teamData && mostRecentGame) {
            this.router.navigate(['/teams/' + this.teamData.id + '/games/' + mostRecentGame.id]);
        }
    }

    showEditForm() {
        this.isEditing = true;
    }

    onCloseModal() {
        this.isEditing = false;
    }

}