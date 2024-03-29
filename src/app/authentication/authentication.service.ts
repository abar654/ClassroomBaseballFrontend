import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators'
import { environment } from "src/environments/environment";

import { AuthenticationApi } from "./apis/authentication.api";
import { RegistrationApi } from "./apis/registration.api";
import { AuthenticationData } from "./models/authentication-data.model";
import { AuthenticationResponse } from "./models/authentication-response.model";

/**
 * Provides an interface for components to access authentication functionalities.
 */

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private readonly AUTH_DATA_KEY = 'auth-data';
    private autoLogoutTimeout: ReturnType<typeof setTimeout> = null;

    // If the user is authenticated then this will hold valid AuthenticationData,
    // otherwise it will hold null.
    // When authentication expires it is automatically set to null.
    private authenticationState: BehaviorSubject<AuthenticationData> = new BehaviorSubject<AuthenticationData>(null);

    constructor(
        private router: Router,
        private authenticationApi: AuthenticationApi,
        private registrationApi: RegistrationApi
    ){}

    public getAuthenticationState(): BehaviorSubject<AuthenticationData> {
        return this.authenticationState;
    }

    public login(email: string, password: string): Promise<AuthenticationResponse> {
        return this.authenticationApi
            .loginRequest(email, password)
            .pipe(
                tap(this.updateAuthentication.bind(this)),
                catchError(this.handleError)
            )
            .toPromise();
    }

    public logout() {
        // Clear the authentication data
        this.authenticationState.next(null);
        localStorage.removeItem(this.AUTH_DATA_KEY);

        // Clear the logout timeout
        if (this.autoLogoutTimeout) {
            clearTimeout(this.autoLogoutTimeout);
            this.autoLogoutTimeout = null;      
        }

        //Redirect to logout destination
        this.router.navigate([environment.logoutRedirect]);
    }

    public register(email: string, password: string): Promise<void> {
        return this.registrationApi.registerRequest(email, password)
            .pipe(
                catchError(this.handleError)
            )
            .toPromise();
    }

    public tryExistingLogin() {
        // Check to see if there is authentication data saved for this session.
        const storedAuthData: {
            email: string,
            _token: string,
            _tokenExpirationDate: number
        } = JSON.parse(localStorage.getItem(this.AUTH_DATA_KEY));

        if (storedAuthData) {
            const loadedAuthData = new AuthenticationData(storedAuthData.email, storedAuthData._token, storedAuthData._tokenExpirationDate);
            // Check that the token is still valid.
            if (loadedAuthData.token) {
                // Set the authentication state to use the stored data.
                this.authenticationState.next(loadedAuthData);
                this.setAutoLogout(storedAuthData._tokenExpirationDate);
            }
        }

    }

    private setAutoLogout(expirationDate: number) {
        // Log the user out when the token expires
        this.autoLogoutTimeout = setTimeout(() => {
            this.logout();
        }, expirationDate - new Date().getTime());
    }

    private updateAuthentication(authResponse: AuthenticationResponse) {
        let authData: AuthenticationData = new AuthenticationData(authResponse.email, authResponse.jwt, authResponse.expirationDate);
        
        // Update the authentication state
        this.authenticationState.next(authData);

        // Save to local storage
        localStorage.setItem(this.AUTH_DATA_KEY, JSON.stringify(authData));

        // Set timer to logout when token expires
        this.setAutoLogout(authResponse.expirationDate);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        // Provide more elegant error messages if desired...
        // By replacing errorResponse with a string
        console.log(errorResponse);
        return throwError(errorResponse.error && errorResponse.error.message || "An unknown error occurred!");
    }

}