import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

type ModalType = "login" | "signup" | null;

/**
 * A routable component which shows the home page.
 * This component also houses a modal for login or signup.
 */

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    modalContents: ModalType = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Ensure that modal state reacts to routing changes
        this.route.url.subscribe((urlSegments: UrlSegment[]) => {
            if (urlSegments && urlSegments.length > 0) {
                if (urlSegments[0].path === "login") {
                    this.modalContents = "login";
                } else if (urlSegments[0].path === "signup") {
                    this.modalContents = "signup";
                }
            }
        });
    }

    onLoginClick(): void {
        this.router.navigate(['/login']);
    }

    onRegisterClick(): void {
        this.router.navigate(['/signup']);
    }

    onCloseModal(): void {
        this.router.navigate(['']);
    }

}
