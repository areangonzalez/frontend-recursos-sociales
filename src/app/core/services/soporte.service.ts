import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SoporteService {

  constructor(private _api: ApiService) { }

  /**
   * Guarda el programa y los permisos del mismo a un usuario
   * @param params { idusuario, rolid, programaid, lista_permisos }
   */
  public asignarPermisos(params: object) {
    return this._api.post("/soportes/crear-asignacion", params);
  }

  public listarAsignacion(idusuario:number) {
    return this._api.get("/soportes/listar-asignacion/" + idusuario);
  }
}
