import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class RecursoSocialService {

  constructor(
    private _apiService: ApiService
  ){}

  listar() {
    return this._apiService.get('/recurso-socials');
  }

  buscarPorPrograma(params:object) {
    let httpParams = new HttpParams();
    httpParams = this._apiService.formatParams(httpParams, params);

    return this._apiService.get('/recurso-socials',httpParams);
  }


}
