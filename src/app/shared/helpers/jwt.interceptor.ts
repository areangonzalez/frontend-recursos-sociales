import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from "../../core/services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _jwtService: JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this._jwtService.getToken();
        if (currentUser && currentUser.datosToken && currentUser.datosToken.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.datosToken.token}`
                }
            });
        }

        return next.handle(request);
    }
}
