import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService } from './api.service';

@Injectable()
export class ComisionFomentoService implements Resolve<any> {

  constructor(
    private _apiService: ApiService
  ){}

  listar() {
    return this._apiService.get('/comision-fomentos');
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
        return this._apiService.get('/comision-fomentos');
    }

}
