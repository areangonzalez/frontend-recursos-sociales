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
  /**
   * obtiene el listado de los programas con us permisos del usuario
   * @param idusuario identificador que define el usuario
   */
  public listarAsignacion(usuarioid:number) {
    return this._api.get("/soportes/listar-asignacion/" + usuarioid);
  }
  public borrarAsignacion(usuarioid: number, programaid: number) {
    let params: object = { usuarioid: usuarioid, programaid: programaid } ;
    return this._api.post("/soportes/borrar-asignacion", params);
  }
}
