import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { AuthenticationApi } from "./apis/authentication.api";
import { RegistrationApi } from "./apis/registration.api";
import { RegistrationComponent } from "./registration/registration.component";

/**
 * A module for user authentication including login/logout and registration.
 */

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        HttpClientModule
    ],
    providers:[
        AuthenticationApi,
        RegistrationApi
    ],
    exports: [
        LoginComponent,
        RegistrationComponent
    ]
})
export class AuthenticationModule {

}