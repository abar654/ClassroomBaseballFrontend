import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../authentication.service";

/**
 * A guard which allows access to a route only when the user is authenticated.
 */

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authenticationService.authenticationState.value ? true : this.router.createUrlTree(['']);
    }

}