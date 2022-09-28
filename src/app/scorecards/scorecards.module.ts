import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ScoreTableComponent } from "./score-table/score-table.component";

/**
 * A module for displaying and managing data about scorecards.
 */

@NgModule({
    declarations: [
        ScoreTableComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [
    ],
    exports: [
        ScoreTableComponent
    ]
})
export class ScorecardsModule {

}