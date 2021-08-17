import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

type ModalType = "login" | "register" | null;

/**
 * A routable component which shows the home page.
 * This component also houses a modal for login or registration.
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
                } else if (urlSegments[0].path === "register") {
                    this.modalContents = "register";
                }
            }
        });
    }

    onLogin(): void {
        this.router.navigate(['/login']);
    }

    onRegister(): void {
        this.router.navigate(['/register']);
    }

    onCloseModal(): void {
        this.router.navigate(['']);
    }

}
