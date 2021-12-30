import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../authentication.service";

/**
 * An interceptor which adds the authorisation header and token to outgoing requests.
 */

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        let modifiedRequest = request;
        const authData = this.authenticationService.authenticationState.value
        console.log("AuthHeaderInterceptor: ", authData);
        if (authData) {
            modifiedRequest = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + authData.token)
            });
        }
        return next.handle(modifiedRequest);
    }
}