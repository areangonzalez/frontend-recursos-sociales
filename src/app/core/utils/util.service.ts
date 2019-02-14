import { Injectable } from "@angular/core";

import { map } from 'rxjs/operators';
import { stringify } from "@angular/core/src/render3/util";

@Injectable()
export class UtilService {

  constructor(){}
  /**
   * @function validarNumero valida si el valor es un numero
   * @param numero [string] parametro que sera validado.
   */
  public validarNumero(numero:any):boolean{
    const patternNum = /^([0-9])*$/;
    return patternNum.test(numero);
  }
  /**
   * @function objetoAFecha funcion que devuelve una fecha en String.
   * @param objeto [Object] fecha ingresada en objeto, definicion: { 'day': 5, 'month': 3, 'year': 2019 }.
   * @param formato [String] Formato de la fecha deseada, definido como: 'yyyy-MM-dd' o 'dd/MM/yyyy'.
   */
  public formatearFecha(dia:number, mes:number, anio:number, formato:string) {
    let fecha: string = '';
    switch(formato){
      case "dd/MM/yyyy":
        fecha = ((dia < 10) ? "0" + dia : dia ) + '-' + ((mes < 10) ? "0" + mes : mes ) + '-' + anio;
        break;
      case "yyyy-MM-dd":
        fecha = anio + '-' + ((mes < 10) ? "0" + mes : mes ) + '-' + ((dia < 10) ? "0" + dia : dia );
        break;
      default:
      fecha = anio + '-' + ((mes < 10) ? "0" + mes : mes ) + '-' + ((dia < 10) ? "0" + dia : dia );
        break;
    }

    return fecha;
  }

  public validarMoneda(moneda:any):boolean {
    const pattern = /^\d*(\.\d{0,2})?$/;
    return pattern.test(moneda);
  }
}
