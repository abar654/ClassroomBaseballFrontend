import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from '@angular/common/http'

/**
 * A module for user authentication including login/logout and registration.
 */

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        LoginComponent
    ]
})
export class AuthenticationModule {

}