import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

/**
 * The app's root component which contains the header and a router outlet.
 */

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit(): void {
        this.authenticationService.tryExistingLogin();
    }

}
