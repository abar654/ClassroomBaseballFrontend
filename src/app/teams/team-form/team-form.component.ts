import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
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
export class TeamFormComponent implements OnInit, OnDestroy {

    teamData: Team;

    nameInputValue: string = "";
    imageInputValue: string = "";

    teamNameFocus: boolean = false;

    editingPlayerId: number = null;
    editingPlayerOriginal: Player = null;

    private currentTeamStateSub: Subscription;

    constructor(
        private teamsService: TeamsService,
        private popupService: PopupService
    ) {}

    ngOnInit(): void {
        this.currentTeamStateSub = this.teamsService.getCurrentTeamState().subscribe((team: Team) => {
            this.teamData = team;
            // Reset the input fields.
            this.nameInputValue = this.teamData ? this.teamData.name : "";
            this.imageInputValue = this.teamData ? this.teamData.image : "";
        });
    }

    ngOnDestroy(): void {
        this.currentTeamStateSub && this.currentTeamStateSub.unsubscribe();
    }

    setTeamNameFocus(isFocused: boolean): void {
        this.teamNameFocus = isFocused;
        if (isFocused) {
            const editingPlayer = this.getEditingPlayer();

            // If a player was being edited but was not saved then revert it.
            if (editingPlayer) {
                editingPlayer.name = this.editingPlayerOriginal.name;
                editingPlayer.color = this.editingPlayerOriginal.color;
                this.editingPlayerId = null;
                this.editingPlayerOriginal = null;
            }
        }
    }

    isEditingTeamName(): boolean {
        return this.teamNameFocus || this.nameInputValue !== this.teamData.name;
    }

    saveTeamName(): void {
        if (this.nameInputValue !== this.teamData.name) {
            this.teamsService.updateTeam(this.teamData.id, this.nameInputValue, this.teamData.image);
        }
    }

    saveImage(): void {
        this.teamsService.updateTeam(this.teamData.id, this.teamData.name, this.imageInputValue);
    }

    async addPlayer() {
        try {
            const newPlayer = await this.teamsService.createPlayerOnCurrentTeam("New player");
            this.editPlayer(newPlayer);
        } catch (error) {
            console.log("TeamFormComponent - addPlayer - error: ", error);
        }
    }

    isEditingPlayer(id: number): boolean {
        return this.editingPlayerId === id;
    }

    getEditingPlayer(): Player {
        return this.teamData.players.find(player => player.id === this.editingPlayerId) || null;
    }

    editPlayer(player: Player) {
        if (!this.isEditingPlayer(player.id)) {
            const editingPlayer = this.getEditingPlayer();

            // If a player was being edited but was not saved then revert it.
            if (editingPlayer) {
                editingPlayer.name = this.editingPlayerOriginal.name;
                editingPlayer.color = this.editingPlayerOriginal.color;
            }
    
            // If team name was being edited but not saved then revert it.
            if (this.isEditingTeamName()) {
                this.nameInputValue = this.teamData.name;
            }
    
            this.editingPlayerId = player.id;
            this.editingPlayerOriginal = JSON.parse(JSON.stringify(player)); // Deep copy data object
        }
    }

    async saveEditingPlayer() {
        try {
            const editingPlayer = this.getEditingPlayer();
            await this.teamsService.updatePlayerOnCurrentTeam(
                editingPlayer.id, 
                editingPlayer.name,
                editingPlayer.color
            );
        } catch (error) {
            console.log("TeamFormComponent - saveEditingPlayer - error: ", error);
        }

        this.editingPlayerId = null;
        this.editingPlayerOriginal = null;
    }

    deletePlayer(player: Player): void {
        this.popupService.show({
            message: "Are you sure you want to delete the player: '" + player.name +"'?",
            dismissable: false,
            buttons: [
                {
                    label: "Delete",
                    onClick: () => {
                        this.teamsService.deletePlayerOnCurrentTeam(player.id);
                    }
                },
                {
                    label: "Cancel",
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
                        this.teamsService.deleteTeam(this.teamData.id);
                    }
                },
                {
                    label: "Cancel",
                    onClick: () => {}
                }
            ]
        });
    }

}