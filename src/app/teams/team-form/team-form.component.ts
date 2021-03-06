import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Player } from "src/app/players/models/player.model";
import { PopupService } from "src/app/shared/popup/popup.service";
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

    editingPlayerId: number = null;
    editingPlayerOriginal: Player = null;

    constructor(
        private teamsService: TeamsService,
        private popupService: PopupService
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
        return this.editingPlayerId === id;
    }

    getEditingPlayer(): Player {
        return this.teamData.players.find(player => player.id === this.editingPlayerId) || null;
    }

    editPlayer(player: Player) {
        const editingPlayer = this.getEditingPlayer();

        // If a player was being edited but was not saved then revert it.
        if (editingPlayer) {
            editingPlayer.name = this.editingPlayerOriginal.name;
            editingPlayer.color = this.editingPlayerOriginal.color;
        }

        this.editingPlayerId = player.id;
        this.editingPlayerOriginal = JSON.parse(JSON.stringify(player)); // Deep copy data object
    }

    saveEditingPlayer() {
        const editingPlayer = this.getEditingPlayer();

        console.log(this.teamData.id, 
            editingPlayer.id, 
            editingPlayer.name,
            editingPlayer.color);
        this.teamsService.updatePlayerOnTeam(
            this.teamData.id, 
            editingPlayer.id, 
            editingPlayer.name,
            editingPlayer.color
        ).subscribe(() => {
            this.editingPlayerId = null;
            this.editingPlayerOriginal = null;
        });
    }

    deletePlayer(player: Player): void {
        this.popupService.show({
            message: "Are you sure you want to delete the player: '" + player.name +"'?",
            dismissable: false,
            buttons: [
                {
                    label: "Delete",
                    onClick: () => {
                        this.teamsService.deletePlayerOnTeam(this.teamData.id, player.id).subscribe(() => {
                            const deletedPlayerIndex = this.teamData.players.indexOf(player);
                            this.teamData.players.splice(deletedPlayerIndex, 1);
                        });
                    }
                },
                {
                    label: "cancel",
                    onClick: () => {}
                }
            ]
        });
    }

    deleteTeam(): void {
        this.popupService.show({
            message: "Are you sure you want to delete the team: '" + this.teamData.name +"'?",
            dismissable: false,
            buttons: [
                {
                    label: "Delete",
                    onClick: () => {
                        this.teamsService.deleteTeam(this.teamData.id).subscribe();
                    }
                },
                {
                    label: "cancel",
                    onClick: () => {}
                }
            ]
        });
    }

}