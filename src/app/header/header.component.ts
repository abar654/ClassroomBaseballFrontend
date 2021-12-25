import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * The header which appears along the top of the screen on all pages of the app.
 */

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isCollapsed: boolean = false;
    isAuthenticated: boolean = false;
    authDataSub: Subscription;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.authDataSub = this.authenticationService.authenticationState.subscribe((authData) => {
            this.isAuthenticated = authData != null;
        })
    }

    ngOnDestroy(): void {
        this.authDataSub.unsubscribe();
    }

    onLogin(): void {
        this.router.navigate(['/login']);
    }

    onRegister(): void {
        this.router.navigate(['/register']);
    }

    onLogout(): void {
        this.authenticationService.logout();
        this.router.navigate([environment.logoutRedirect]);
    }

}
