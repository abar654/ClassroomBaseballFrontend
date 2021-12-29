import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

/**
 * Communicates with the registration apis on the backend
 */

@Injectable()
export class RegistrationApi {

    private readonly registerApi = environment.apiEndpoint + '/register';

    constructor(
        private httpClient: HttpClient
    ){}

    public registerRequest(email: string, password: string): Observable<void> {
        return this.httpClient.post<void>(
            this.registerApi, 
            {
                email: email,
                password: password
            }
        );
    }

}