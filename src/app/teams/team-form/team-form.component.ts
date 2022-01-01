import { Component, Input, OnInit } from "@angular/core";
import { Team } from "../models/team.model";
import { TeamsService } from "../teams.service";

/**
 * A panel component for editing the details of a team and its players.
 * An empty version is shown for creation of a new team.
 */

@Component({
    selector: 'app-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

    @Input()
    teamData: Team;

    nameInput: string = "";
    imageInput: string = "";

    constructor(
        private teamService: TeamsService
    ) {}

    ngOnInit(): void {
        this.nameInput = this.teamData.name;
        this.imageInput = this.teamData.image;
    }

    saveName(): void {
        this.teamData.name = this.nameInput;
        this.teamService.updateTeam(this.teamData.id, this.teamData.name, this.teamData.image).subscribe();
    }

    saveImage(): void {
        this.teamData.image = this.imageInput;
        this.teamService.updateTeam(this.teamData.id, this.teamData.name, this.teamData.image).subscribe();
    }

    addPlayer(): void {
        // TODO: Send updates directly and push using the ID that you receive back!
        // Subscribe to the observable and push the player when it completes.
        this.teamService.createPlayerOnTeam(this.teamData.id);
        this.teamData.players.push({
            name: "",
            color: "#0000FF"
        });
    }

}