import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService } from './api.service';

@Injectable()
export class TipoRecursoService implements Resolve <any> {

  constructor(
    private _apiService: ApiService
  ){}

  buscarPorPrograma(programaid) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set("programaid", programaid);

    return this._apiService.get('/tipo-recursos',httpParams);
  }

  get() {
    return this._apiService.get('/tipo-recursos');
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, {programaid: 5});

      return this._apiService.get('/tipo-recursos');
    }

}
