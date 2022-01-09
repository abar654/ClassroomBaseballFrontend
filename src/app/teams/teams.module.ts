import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GameDisplayComponent } from "../games/game-display/game-display.component";
import { GamesModule } from "../games/games.module";
import { SharedModule } from "../shared/shared.module";
import { TeamsApi } from "./apis/teams.api";
import { TeamDashboardComponent } from "./team-dashboard/team-dashboard.component";
import { TeamFormComponent } from "./team-form/team-form.component";
import { TeamSummaryComponent } from "./team-summary/team-summary.component";
import { TeamsListComponent } from "./teams-list/teams-list.component";
import { TeamsService } from "./teams.service";

/**
 * A module for displaying and managing data about teams.
 */

const teamsRoutes = [
    { path: ':teamId/games/:gameId', component: GameDisplayComponent },
    { path: ':teamId', component: TeamDashboardComponent },
    { path: '', component: TeamsListComponent }
];

@NgModule({
    declarations: [
        TeamsListComponent,
        TeamDashboardComponent,
        TeamSummaryComponent,
        TeamFormComponent
    ],
    imports: [
        SharedModule,
        GamesModule, // TODO: Consider if this could be worth lazy loading.
        FormsModule,
        RouterModule.forChild(teamsRoutes)
    ],
    providers: [
        TeamsService,
        TeamsApi
    ],
    exports: [
    ]
})
export class TeamsModule {

}