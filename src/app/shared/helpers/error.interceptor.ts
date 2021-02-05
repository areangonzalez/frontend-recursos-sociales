import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService, AuthenticationService, JwtService } from 'src/app/core/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private service_count = 0;
    constructor(private authenticationService: AuthenticationService, private _loadService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadService.show();
        this.service_count++;
        return next.handle(request).pipe(
          catchError(err => {
              // error de inahutorizado
              if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
              }
              if (err.status === 403) {
                // auto logout if 401 response returned from api
                let mensaje = "No tiene permitido ejecutar esta accion";
                return throwError(mensaje);
              }
              // error.message viene como objeto
              if (err.status === 400){
                let mensaje = this.recorrerErrorObjeto(JSON.parse(err.error.message));
                // envio el mensaje como texto.
                return throwError(mensaje);
              }else{ // cualquier otro error
                const error = err.message || err.error.message || err.statusText;
                return throwError(error);
              }
          }), finalize(() => {
            this.service_count--;
            if (this.service_count === 0) {
              this._loadService.hide();
            }
          })
        )
    }

    private recorrerErrorObjeto(error:object) {
      let mensaje = ""; // variable que arma el mensaje en string
      for (const key in error) { // recorro el array
        let concatMsj = ""; // variable que concatena el/los mensajes que pueden existir dentro de los items
        mensaje += (mensaje != "") ? "\n" : "";
        let tituloMensaje = key.replace("_", " "); // remplazo los guiones bajos por espacios.
        mensaje += this.ucWords(tituloMensaje) + ":"
        for (let i = 0; i < error[key].length; i++) { // recorro el objeto segun su clave
          concatMsj += (concatMsj != "") ? "," : " " + error[key][i];
        }
        mensaje += concatMsj;
      }
      return mensaje;
    }

    private ucWords(string){
      let arrayWords: any;
      let returnString = "";
      let len:number;
      arrayWords = string.split(" ");
      len = arrayWords.length;
      for(let i=0;i < len ;i++){
        if(i != (len-1)){
          returnString = returnString+this.ucFirst(arrayWords[i])+" ";
        }else{
          returnString = returnString+this.ucFirst(arrayWords[i]);
        }
      }
      return returnString;
     }

     private ucFirst(string){
      return string.substr(0,1).toUpperCase()+string.substr(1,string.length).toLowerCase();
     }
}
