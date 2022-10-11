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

    readonly MIN_PASSWORD_LENGTH: number = 6;
    isLoading: boolean = false;
    errorMessage: string = null;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ){}

    async onSubmit(regForm: NgForm) {
        this.isLoading = true;
        this.errorMessage = null;

        if (regForm.valid) {

            if (regForm.value.password === regForm.value.checkPassword) {
                this.doSubmit(regForm);
            } else {
                this.isLoading = false;
                this.errorMessage = "Passwords do not match!";
            }

        } else {
            
            if (regForm.controls.email.errors && regForm.controls.email.errors.email) {
                this.errorMessage = "Please enter a valid email address.";
            } else if (regForm.controls.password.errors && regForm.controls.password.errors.minlength
                || regForm.controls.checkPassword.errors && regForm.controls.checkPassword.errors.minlength) {
                this.errorMessage = "Password must be atleast " + this.MIN_PASSWORD_LENGTH + " characters.";
            } else {
                this.errorMessage = "Invalid data. Please check you have entered all the details correctly.";
            }
            this.isLoading = false;
        }
    }

    async doSubmit(regForm: NgForm) {
        try {
            await this.authenticationService.register(regForm.value.email, regForm.value.password);
            this.isLoading = false;
            this.router.navigate(['/login']);
        } catch (error: any) {
            this.isLoading = false;
            this.errorMessage = error;
        }
    }

}