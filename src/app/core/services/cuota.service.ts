import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  constructor(private _api: ApiService) { }
  /**
   * borrado de cuota
   * @param id numero de identificador
   * @returns respuesta del api
   */
  borrar(id:number) {
    return this._api.delete('/cuotas/' + id);
  }
  /**
   * Listado de cuotas por id de recurso (prestacion)
   * @param idRecurso identificador del recurso (prestacion)
   * @returns un array de objetos o mensaje de error
   */
  listar(idRecurso: number) {
    let httpParams = new HttpParams();
    httpParams = this._api.formatParams(httpParams, { recursoid: idRecurso });

    return this._api.get('/cuotas', httpParams);
  }


}
