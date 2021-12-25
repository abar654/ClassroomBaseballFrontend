import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { AuthenticationApi } from "./apis/authentication.api";

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
    providers:[
        AuthenticationApi
    ],
    exports: [
        LoginComponent
    ]
})
export class AuthenticationModule {

}