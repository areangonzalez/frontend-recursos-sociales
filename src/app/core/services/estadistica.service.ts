import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class EstadisticaService {

  constructor(
    private _apiService: ApiService
  ){}

  /**
   * Obtiene un listado de programas con la cantidad de beneficiarios que pertenecen a una localidad
   * @param localidadid [number] Identificador de localidad
   */
  programasPorLocalidad(localidadid:number) {
    return this._apiService.get('/estadisticas/beneficiarios-por-programa-en-localidad/' + localidadid);
  }
  /**
   * Obtiene un listado de tipos de recursos con la cantidad de beneficiarios que pertenecen a una localidad
   * @param localidadid [number] Identificador de localidad
   */
  tipoPrestacionPorLocalidad(localidadid:number) {
    return this._apiService.get('/estadisticas/beneficiarios-por-tipo-recurso-en-localidad/' + localidadid);
  }
  /**
   * Listado de las localidades que representan los mayores montos
   * @param rango [number] numero de localidades a conseguir.
   */
  montosLocalidades(rango:number) {
    return this._apiService.get('/estadisticas/montos-por-localidades/' + rango);
  }

}
