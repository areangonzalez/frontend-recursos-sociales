import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService } from './api.service';

@Injectable()
export class TipoResponsableService implements Resolve <any> {

  constructor(
    private _apiService: ApiService
  ){}

  get() {
    return this._apiService.get('/tipo-responsables');
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {

      return this._apiService.get('/tipo-responsables');
    }

}
