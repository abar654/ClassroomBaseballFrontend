import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthenticationService } from "../authentication.service";

/**
 * The registration form for users to signup.
 */

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

    isLoading: boolean = false;
    errorMessage: string = null;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ){}

    async onSubmit(regForm: NgForm) {
        this.isLoading = true;
        this.errorMessage = null;
        if (regForm.value.password === regForm.value.checkPassword) {
            try {
                await this.authenticationService.register(regForm.value.email, regForm.value.password);
                this.isLoading = false;
                this.router.navigate(['/login']);
            } catch (error: any) {
                this.isLoading = false;
                this.errorMessage = error;
            }
        } else {
            this.isLoading = false;
            this.errorMessage = "Passwords do not match!";
        }
    }

}