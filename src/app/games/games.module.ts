import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { GameDisplayComponent } from "./game-display/game-display.component";
import { GameSummaryComponent } from "./game-summary/game-summary.component";

/**
 * A module for displaying and managing data about games.
 */

// TODO: Consider making this lazy load only when the TeamDashboard is loaded

@NgModule({
    declarations: [
        GameSummaryComponent,
        GameDisplayComponent
    ],
    imports: [
        SharedModule,
        FormsModule
    ],
    providers: [
    ],
    exports: [
        GameSummaryComponent,
        GameDisplayComponent
    ]
})
export class GamesModule {

}