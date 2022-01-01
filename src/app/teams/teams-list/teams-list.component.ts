import { Component, OnDestroy, OnInit } from "@angular/core";
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

    private teamsSub: Subscription;

    constructor(
        private teamsService: TeamsService
    ){}

    ngOnInit(): void {
        this.teamsService.reload();
        this.teamsSub = this.teamsService.teamsState.subscribe((teams: Team[]) => {
            this.teams = teams;
        });
    }

    ngOnDestroy(): void {
        this.teamsSub && this.teamsSub.unsubscribe();
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

    onCloseModal() {
        this.formEditTeam = null;
    }

}