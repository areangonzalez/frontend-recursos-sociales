/**
 * Arean gonzalez
 * creado el 07/01/2021
 * Este servicio pertenece a usuarioService.
 * Aqui se asignan, listan y borran los permisos por programas de un usuario.
 */
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
    return this._api.post("/usuarios/crear-asignacion", params);
  }
  /**
   * obtiene el listado de los programas con us permisos del usuario
   * @param idusuario identificador que define el usuario
   */
  public listarAsignacion(usuarioid:number) {
    return this._api.get("/usuarios/listar-asignacion/" + usuarioid);
  }
  /**
   * Borrado de una asignacion (programa y sus permisos)
   * @param usuarioid
   * @param programaid
   */
  public borrarAsignacion(usuarioid: number, programaid: number) {
    let params: object = { usuarioid: usuarioid, programaid: programaid } ;
    return this._api.post("/usuarios/borrar-asignacion", params);
  }
}
