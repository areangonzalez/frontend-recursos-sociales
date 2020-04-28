import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class ModuloAlimentarService implements Resolve<any> {

  constructor(
    private _apiService: ApiService
  ){}

  public buscar(params: object) {
    return this._apiService.post('/recursos/filtrar', params);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      let params = { pagesize: 20, pages: 0, programaid: 6 };
      return this._apiService.post('/recursos/filtrar', params);
    }
  }
