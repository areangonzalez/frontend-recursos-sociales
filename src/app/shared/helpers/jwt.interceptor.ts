import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../../core/services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this._auth.loggedIn;
        console.log(currentUser);

        if (currentUser && currentUser.access_token) {
          console.log("entro");

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }
        console.log("no entro");

        return next.handle(request);
    }
}
