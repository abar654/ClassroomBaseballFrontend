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
    isEditing: boolean = false;

    private teamsStateSub: Subscription;

    constructor(
        private teamsService: TeamsService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.teamsService.loadTeams();
        this.teamsStateSub = this.teamsService.getTeamsState().subscribe((teams: Team[]) => {
            if (teams !== null) {
                this.teams = teams;
            }
        });
    }

    ngOnDestroy(): void {
        this.teamsStateSub && this.teamsStateSub.unsubscribe();
    }

    async openForm(team?: Team) {
        this.isEditing = true;
        if (!team) {
            try {
                team = await this.teamsService.createTeam();
            } catch (error) {
                console.log("TeamsListComponent - openForm - error: ", error);
            }
        }
        this.teamsService.setCurrentTeamById(team.id);
    }

    showDashboard(team: Team) {
        this.router.navigate(['/teams/' + team.id]);
    }

    onCloseModal() {
        this.isEditing = false;
        this.teamsService.setCurrentTeamById(null);
    }

}