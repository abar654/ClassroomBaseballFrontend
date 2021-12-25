import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

import { AuthenticationResponse } from "../models/authentication-response.model";

/**
 * Communicates with the authentication apis on the backend
 */

@Injectable()
export class AuthenticationApi {

    private readonly authApi = environment.apiEndpoint + '/authenticate';

    constructor(
        private httpClient: HttpClient
    ){}

    public loginRequest(email: string, password: string): Observable<AuthenticationResponse> {
        return this.httpClient.post<AuthenticationResponse>(
            this.authApi, 
            {
                username: email,
                password: password
            }
        );
    }

}