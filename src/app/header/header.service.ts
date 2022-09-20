import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication/authentication.service";
import { HeaderLink } from "./header-link.model";

/**
 * Provides an interface for components to configure the contents of the header bar.
 */

@Injectable({providedIn: 'root'})
export class HeaderService {

    private title: BehaviorSubject<string> = new BehaviorSubject<string>("Classroom Baseball");
    private links: BehaviorSubject<HeaderLink[]> = new BehaviorSubject<HeaderLink[]>([]);

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ){

        const loginLink: HeaderLink = {
            labelHtml: "Login",
            priority: 10,
            onClick: () => {
                this.router.navigate(['/login']);
            }
        };

        const registerLink: HeaderLink = {
            labelHtml: "Sign Up",
            priority: 9,
            onClick: () => {
                this.router.navigate(['/signup']);
            }
        };

        const logoutLink: HeaderLink = {
            labelHtml: "Logout",
            priority: 0,
            onClick: () => {
                this.authenticationService.logout();
                this.router.navigate([environment.logoutRedirect]);
            }
        };

        this.authenticationService.getAuthenticationState().subscribe((authData) => {
            if (authData != null) {
                // Remove login and register buttons
                this.removeLink(loginLink);
                this.removeLink(registerLink);

                // Add logout button
                this.addLink(logoutLink);
            } else {
                // Add login and register buttons
                this.addLink(loginLink);
                this.addLink(registerLink);

                // Remove logout button
                this.removeLink(logoutLink);
            }
        });
    }

    public getTitleState(): BehaviorSubject<string> {
        return this.title;
    }

    public getLinksState(): BehaviorSubject<HeaderLink[]> {
        return this.links;
    }

    public setTitle(title: string) {
        this.title.next(title);
    }

    public addLink(link: HeaderLink) {
        const links = [ ...this.links.getValue() ];
        let insertIndex = 0;
        while (insertIndex < links.length) {
            if (links[insertIndex].priority < link.priority) {
                break;
            }
            insertIndex++;
        }
        links.splice(insertIndex, 0, link);
        this.links.next(links);
    }

    public removeLink(link: HeaderLink) {
        const links = [ ...this.links.getValue() ];
        const removeIndex = links.indexOf(link);
        if (removeIndex > -1) {
            links.splice(links.indexOf(link), 1);
            this.links.next(links);
        }
    }

}
