import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlayersModule } from "../players/players.module";
import { SharedModule } from "../shared/shared.module";
import { GameControlComponent } from "./game-control/game-control.component";
import { GameDisplayComponent } from "./game-display/game-display.component";
import { GameLeaderboardComponent } from "./game-leaderboard/game-leaderboard.component";
import { GameListComponent } from "./game-list/game-list.component";
import { PlayerAvatarComponent } from "./player-avatar/player-avatar.component";

/**
 * A module for displaying and managing data about games.
 */

@NgModule({
    declarations: [
        GameDisplayComponent,
        GameLeaderboardComponent,
        GameListComponent,
        GameControlComponent,
        PlayerAvatarComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        PlayersModule
    ],
    providers: [
    ],
    exports: [
        GameDisplayComponent,
        GameListComponent
    ]
})
export class GamesModule {

}