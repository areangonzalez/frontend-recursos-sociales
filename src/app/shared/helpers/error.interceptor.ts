import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { LoaderService } from 'src/app/core/services';
//import { AuthenticationService } from '../services/authentication.service';
//import { LoaderService } from "../components/loader/loader.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private envios = 0;
    private recibidos = 0;
    //constructor(private authenticationService: AuthenticationService, private _loadService: LoaderService) { }
    constructor(private _loadService: LoaderService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadService.show();
        console.log("url: ",request.url);
        return next.handle(request).pipe(
          tap(res => {
            if (res.type === HttpEventType.Sent) {
              // cuento los envios
              this.envios++;
            }

            if (res.type === HttpEventType.Response) {
              // cuento los recibidos
              this.recibidos++;
              // comparo y si son iguales oculto el spinner
              if (this.envios == this.recibidos){
                this._loadService.hide()
              }
            }
          }),
          catchError(err => {
            if (err.status === 401) {
              // auto logout if 401 response returned from api
              //              this.authenticationService.logout();
              location.reload(true);
            }
            // error.message viene como objeto
            if (err.status === 400){
              let mensaje = this.recorrerErrorObjeto(JSON.parse(err.error.message));
              // envio el mensaje como texto.
              return throwError(mensaje);
            }else{ // cualquier otro error
              const error = err.error.message || err.statusText;
              console.log("error interceptor: ",error);
              return throwError(error);
            }
          })
        )
    }

    private recorrerErrorObjeto(error:object) {
      let mensaje = ""; // variable que arma el mensaje en string
      for (const key in error) { // recorro el array
        let concatMsj = ""; // variable que concatena el/los mensajes que pueden existir dentro de los items
        mensaje += (mensaje != "") ? "\n" : "";
        mensaje += key.replace("_", " ") + ":"; // remplazo los guiones bajos por espacios.
        for (let i = 0; i < error[key].length; i++) { // recorro el objeto segun su clave
          concatMsj += (concatMsj != "") ? "," : " " + error[key][i];
        }
        mensaje += concatMsj;
      }
      return mensaje;
    }
}
