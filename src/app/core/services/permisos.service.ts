import { ApiService } from './api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermisosService implements Resolve<any> {

  constructor(private _api: ApiService) { }

  public listar() {
    return this._api.get('/permisos');
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
        return this._api.get('/permisos');
    }
}
