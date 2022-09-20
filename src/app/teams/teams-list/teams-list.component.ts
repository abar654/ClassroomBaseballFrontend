import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { HeaderService } from "src/app/header/header.service";
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
    private currentTeamStateSub: Subscription;

    constructor(
        private teamsService: TeamsService,
        private router: Router,
        private headerService: HeaderService
    ){}

    ngOnInit(): void {
        this.headerService.setTitle("My teams");
        this.teamsService.loadTeams();
        this.teamsStateSub = this.teamsService.getTeamsState().subscribe((teams: Team[]) => {
            if (teams !== null) {
                this.teams = teams;
            }
        });
        this.currentTeamStateSub = this.teamsService.getCurrentTeamState().subscribe((team: Team) => {
            if (team === null) {
                this.isEditing = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.teamsStateSub && this.teamsStateSub.unsubscribe();
        this.currentTeamStateSub && this.currentTeamStateSub.unsubscribe();
    }

    async openForm(team?: Team) {
        this.isEditing = true;
        if (!team) {
            try {
                team = await this.teamsService.createTeam("New team");
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
        this.teamsService.setCurrentTeamById(null);
    }

}