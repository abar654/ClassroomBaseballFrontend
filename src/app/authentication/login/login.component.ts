import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

import { AuthenticationService } from "../authentication.service";

/**
 * The login form for users to authenticate.
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    isLoading: boolean = false;
    errorMessage: string = null;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ){}

    async onSubmit(loginForm: NgForm) {
        this.isLoading = true;
        this.errorMessage = null;
        try {
            await this.authenticationService.login(loginForm.value.email, loginForm.value.password);
            console.log("LoginComponent: login success!");
            this.isLoading = false;
            this.router.navigate([environment.authenticatedRedirect]);
        } catch (error: any) {
            this.isLoading = false;
            this.errorMessage = error;
        }
    }

}