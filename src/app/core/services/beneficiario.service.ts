import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class BeneficiarioService {

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
}
