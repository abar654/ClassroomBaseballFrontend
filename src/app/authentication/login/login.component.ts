import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
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

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ){}

    onSubmit(loginForm: NgForm) {
        this.isLoading = true;
        this.authenticationService.login(loginForm.value.email, loginForm.value.password).subscribe(
            () => {
                console.log("LoginComponent: login success!");
                this.isLoading = false;
                this.router.navigate(['/teams']);
            },
            (error) => {
                console.log("LoginComponent: error !", error);
            }
        )
    }

}