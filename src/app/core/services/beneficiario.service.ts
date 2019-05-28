import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class BeneficiarioService implements Resolve<any> {

  constructor(
    private _apiService: ApiService
  ){}

  listar() {
    return this._apiService.get('/beneficiarios');
  }

  public buscar(params:object) {
    let httpParams = new HttpParams();
    httpParams = this._apiService.formatParams(httpParams, params);

    return this._apiService.get('/beneficiarios',httpParams);
  }

  public beneficiarioPorId(id:any) {
    return this._apiService.get('/beneficiarios/' + id);
  }



  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, { pagesize: 20, pages: 0 });
      return this._apiService.get('/beneficiarios', httpParams);
    }

}
