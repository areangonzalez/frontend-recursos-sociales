import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
//import { AuthenticationService } from '../services/authentication.service';
//import { LoaderService } from "../components/loader/loader.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    //constructor(private authenticationService: AuthenticationService, private _loadService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log(request);
        ///this._loadService.show();
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
      //              this.authenticationService.logout();
                    location.reload(true);
                }
                const error = err.error.message || err.statusText;
                console.log("error: ",error);
                return throwError(error);
            }),
            //finalize(() => this._loadService.hide())
        )
    }
}
