import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GameDisplayComponent } from "../games/game-display/game-display.component";
import { GamesModule } from "../games/games.module";
import { ScorecardsModule } from "../scorecards/scorecards.module";
import { SharedModule } from "../shared/shared.module";
import { StatisticsApi } from "./apis/statistics.api";
import { TeamsApi } from "./apis/teams.api";
import { TeamDashboardComponent } from "./team-dashboard/team-dashboard.component";
import { TeamFormComponent } from "./team-form/team-form.component";
import { TeamStatisticsComponent } from "./team-statistics/team-statistics.component";
import { TeamStatisticsService } from "./team-statistics/team-statistics.service";
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
        TeamStatisticsComponent,
        TeamsListComponent,
        TeamDashboardComponent,
        TeamSummaryComponent,
        TeamFormComponent
    ],
    imports: [
        SharedModule,
        GamesModule,
        ScorecardsModule,
        FormsModule,
        RouterModule.forChild(teamsRoutes)
    ],
    providers: [
        TeamStatisticsService,
        StatisticsApi,
        TeamsService,
        TeamsApi
    ],
    exports: [
    ]
})
export class TeamsModule {

}