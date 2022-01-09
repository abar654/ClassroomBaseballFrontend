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
    mostRecentGame: Game = null;
    isEditing: boolean = false;

    private teamsSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private teamsService: TeamsService,
        private gamesService: GamesService,
        @Inject(LOCALE_ID) private locale: string
    ){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.teamsService.reload();
            this.teamsSub = this.teamsService.getTeamsState().subscribe((teams: Team[]) => {
                // If teams is still null then it hasn't been loaded yet.
                if (teams !== null) {
                    this.teamData = teams.find(team => team.id === parseInt(params.teamId)) || null;
                    if (this.teamData !== null) {
                        if (this.teamData.games.length > 0) {
                            this.mostRecentGame = this.teamData.games[this.teamData.games.length - 1];
                            this.mostRecentGame.team = this.teamData;
                        }
                    } else {
                        this.router.navigate(['/teams']);
                    }
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.teamsSub && this.teamsSub.unsubscribe();
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