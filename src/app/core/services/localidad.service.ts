import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService } from './api.service';

@Injectable()
export class LocalidadService implements Resolve<any> {

  constructor(
    private _apiService: ApiService
  ){}

  listar() {
    return this._apiService.get('/localidads');
  }

  programasPorLocalidad(id:number) {
    return this._apiService.get('/localidads/programa-localidad/' + id);
  }

  tipoPrestacionPorLocalidad(id:number) {
    return this._apiService.get('/localidads/tipo-prestacion-localidad/' + id);
  }

  montosLocalidades(rango:number) {
    return this._apiService.get('/localidads/monto-localidad/' + rango);
  }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
        return this._apiService.get('/localidads');
    }

}
