import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * The header which appears along the top of the screen on all pages of the app.
 */

// TODO: Consider adding a service which can be used to configure the text and links in the header.

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isCollapsed: boolean = true;
    isAuthenticated: boolean = false;
    authDataSub: Subscription;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.authDataSub = this.authenticationService.getAuthenticationState().subscribe((authData) => {
            this.isAuthenticated = authData != null;
        });
    }

    ngOnDestroy(): void {
        this.authDataSub && this.authDataSub.unsubscribe();
    }

    onLogin(): void {
        this.router.navigate(['/login']);
        this.isCollapsed = true;
    }

    onRegister(): void {
        this.router.navigate(['/signup']);
        this.isCollapsed = true;
    }

    onLogout(): void {
        this.authenticationService.logout();
        this.router.navigate([environment.logoutRedirect]);
        this.isCollapsed = true;
    }

    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }

}
