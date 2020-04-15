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

  public beneficiarioModuloAlimentar(id:any) {
    return this._apiService.get('/modulo-alimentar');
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      /* let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, { pagesize: 20, pages: 0 });
      return this._apiService.get('/modulo-alimentar', httpParams); */
      return this._apiService.get('/modulo-alimentar');
    }
  }
