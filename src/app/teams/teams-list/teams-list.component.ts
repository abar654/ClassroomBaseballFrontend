import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Team } from "../models/team.model";
import { TeamsService } from "../teams.service";

/**
 * A routable component which shows a grid containing a summary card for each team.
 */

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit, OnDestroy {

    teams: Team[] = [];
    formEditTeam: Team = null;

    private teamsStateSub: Subscription;

    constructor(
        private teamsService: TeamsService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.teamsService.reload();
        this.teamsStateSub = this.teamsService.getTeamsState().subscribe((teams: Team[]) => {
            if (teams !== null) {
                this.teams = teams;
                if (this.formEditTeam) {
                    this.formEditTeam = teams.find(team => team.id === this.formEditTeam.id) || null;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.teamsStateSub && this.teamsStateSub.unsubscribe();
    }

    openForm(team?: Team) {
        if (team) {
            this.formEditTeam = team;
        } else {
            this.teamsService.createTeam().subscribe((team: Team) => {
                this.formEditTeam = team;
            });
        }
    }

    showDashboard(team: Team) {
        this.router.navigate(['/teams/' + team.id]);
    }

    onCloseModal() {
        this.formEditTeam = null;
    }

}