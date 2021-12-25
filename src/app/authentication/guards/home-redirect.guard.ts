import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../authentication.service";

/**
 * A guard which redirects home routes to the teams route
 * if the user is already authenticated.
 */

@Injectable({ providedIn: 'root' })
export class HomeRedirectGuard implements CanActivate {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authenticationService.authenticationState.value ? this.router.createUrlTree([environment.authenticatedRedirect]) : true;
    }

}