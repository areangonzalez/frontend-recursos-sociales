import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements Resolve<any> {

  constructor(private _api: ApiService) { }


  public guardar(params: object) {
    return this._api.post('/usuarios', params);
  }

  public listar() {
    return this._api.get('/usuarios');
  }

  public buscar(params:object) {
    let httpParams = new HttpParams();
    httpParams = this._api.formatParams(httpParams, params);

    return this._api.get('/usuarios',httpParams);
  }

  public buscarPorId(id: number) {
    return this._api.get('/usuarios/' + id);
  }

  public actualizarUsuario(params:object, id: number) {
    return this._api.put('/usuarios/' + id, params);
  }

  public baja(params: object, id: number) {
    return this._api.put('/usuarios/baja/' + id, params);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      let httpParams = new HttpParams();
      httpParams = this._api.formatParams(httpParams, { pagesize: 20, pages: 0 });
      return this._api.get('/usuarios', httpParams);
    }



}
