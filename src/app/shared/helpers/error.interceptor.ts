import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { LoaderService, AuthenticationService } from 'src/app/core/services';
//import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private envios = 0;
    private recibidos = 0;
    constructor(private authenticationService: AuthenticationService, private _loadService: LoaderService) { }
    //constructor(private _loadService: LoaderService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadService.show();
        //console.log("url: ",request.url);
        return next.handle(request).pipe(
          tap(res => {
            // res.type is prod and zero is dev
            let tipoRespuesta = (environment.production) ? res.type : 0 ;
            if (tipoRespuesta === HttpEventType.Sent) {
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
            console.log(err);
            this.recibidos++;
            if (err.status === 401) {
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              location.reload(true);
              this._loadService.hide();
            }
            // error.message viene como objeto
            if (err.status === 400){
              let mensaje = this.recorrerErrorObjeto(JSON.parse(err.error.message));
              // envio el mensaje como texto.
              this._loadService.hide();
              return throwError(mensaje);
            }else{ // cualquier otro error
              const error = err.error.message || err.statusText;
              this._loadService.hide();
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
