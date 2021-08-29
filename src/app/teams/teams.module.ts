import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { TeamDashboardComponent } from "./team-dashboard/team-dashboard.component";
import { TeamsListComponent } from "./teams-list/teams-list.component";

/**
 * A module for displaying and managing data about teams.
 */

const teamsRoutes = [
    { path: '', component: TeamsListComponent }
]

@NgModule({
    declarations: [
        TeamsListComponent,
        TeamDashboardComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(teamsRoutes)
    ],
    exports: [
    ]
})
export class TeamsModule {

}