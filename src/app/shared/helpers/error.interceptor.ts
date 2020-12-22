import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { LoaderService, AuthenticationService, JwtService } from 'src/app/core/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private envios = 0;
    private recibidos = 0;
    constructor(private authenticationService: AuthenticationService, private _loadService: LoaderService, private _jwtService: JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadService.show();
        return next.handle(request).pipe(
          tap(res => {
            console.log("envios: ", this.envios);
            console.log("recibidos: ", this.recibidos);
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
            // verifico si existe el acceso del usuario
            let accessUser = this._jwtService.getToken();
            if (accessUser && accessUser.datosToken){
              this.recibidos++;
            }
            // error de inahutorizado
            if (err.status === 401) {
              this.recibidos++;
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              location.reload(true);
              this._loadService.hide();
            }
            if (err.status === 403) {
              // auto logout if 401 response returned from api
              this._loadService.hide();
              let mensaje = "No tiene permitido ejecutar esta accion";
              return throwError(mensaje);
            }
            // error.message viene como objeto
            if (err.status === 400){
              this.recibidos++;
              let mensaje = this.recorrerErrorObjeto(JSON.parse(err.error.message));
              // envio el mensaje como texto.
              this._loadService.hide();
              return throwError(mensaje);
            }else{ // cualquier otro error
              const error = err.message || err.error.message || err.statusText;
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
