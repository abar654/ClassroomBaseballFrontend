import { Component, Input, OnInit } from "@angular/core";
import { Player } from "src/app/players/models/player.model";
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

    editingPlayer: Player = null;
    editingPlayerOriginal: Player = null;

    constructor(
        private teamsService: TeamsService
    ) {}

    ngOnInit(): void {
        this.nameInput = this.teamData.name;
        this.imageInput = this.teamData.image;
    }

    saveName(): void {
        this.teamData.name = this.nameInput;
        this.teamsService.updateTeam(this.teamData.id, this.teamData.name, this.teamData.image).subscribe();
    }

    saveImage(): void {
        this.teamData.image = this.imageInput;
        this.teamsService.updateTeam(this.teamData.id, this.teamData.name, this.teamData.image).subscribe();
    }

    addPlayer(): void {
        this.teamsService.createPlayerOnTeam(this.teamData.id).subscribe((player: Player) => {
            this.teamData.players.push(player);
            this.editPlayer(player);
        });
    }

    isEditingPlayer(id: number): boolean {
        return this.editingPlayer && this.editingPlayer.id === id;
    }

    editPlayer(player: Player) {
        // If player was being edited but was not saved then revert.
        if (this.editingPlayer) {
            this.editingPlayer.name = this.editingPlayerOriginal.name;
            this.editingPlayer.color = this.editingPlayerOriginal.color;
        }
        this.editingPlayer = player;
        this.editingPlayerOriginal = JSON.parse(JSON.stringify(player)); // Deep copy data object
    }

    saveEditingPlayer() {
        this.teamsService.updatePlayerOnTeam(
            this.teamData.id, 
            this.editingPlayer.id, 
            this.editingPlayer.name,
            this.editingPlayer.color
        ).subscribe(() => {
            this.editingPlayer = null;
            this.editingPlayerOriginal = null;
        });
    }

}