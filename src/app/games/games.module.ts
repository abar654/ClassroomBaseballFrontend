import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlayersModule } from "../players/players.module";
import { SharedModule } from "../shared/shared.module";
import { GameDisplayComponent } from "./game-display/game-display.component";
import { GameLeaderboardComponent } from "./game-leaderboard/game-leaderboard.component";
import { GameListComponent } from "./game-list/game-list.component";
import { GameSummaryComponent } from "./game-summary/game-summary.component";

/**
 * A module for displaying and managing data about games.
 */

// TODO: Consider making this lazy load only when the TeamDashboard is loaded

@NgModule({
    declarations: [
        GameSummaryComponent,
        GameDisplayComponent,
        GameLeaderboardComponent,
        GameListComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        PlayersModule
    ],
    providers: [
    ],
    exports: [
        GameSummaryComponent,
        GameDisplayComponent,
        GameListComponent
    ]
})
export class GamesModule {

}