import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Team } from "../models/team.model";
import { TeamsService } from "../teams.service";

/**
 * A routable component for displaying information about and managing a team.
 */

@Component({
    selector: 'app-team-dashboard',
    templateUrl: './team-dashboard.component.html'
})
export class TeamDashboardComponent implements OnInit {

    teamData: Team = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private teamsService: TeamsService
    ){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.teamsService.reload();
            this.teamsService.getTeamsState().subscribe((teams: Team[]) => {
                // If teams is still null then it hasn't been loaded yet.
                if (teams !== null) {
                    this.teamData = teams.find(team => team.id === parseInt(params.teamId)) || null;
                    if (this.teamData === null) {
                        this.router.navigate(['/teams']);
                    }
                }
            });
        });
    }

}