import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class RecursoSocialService {

  constructor(
    private _apiService: ApiService
  ){}

  listar() {
    return this._apiService.get('/recursos');
  }

  public buscar(params:object) {
    let httpParams = new HttpParams();
    httpParams = this._apiService.formatParams(httpParams, params);

    return this._apiService.get('/recursos',httpParams);
  }

  public guardar(params:object, id:number) {
    if (id !== 0) {
      return this._apiService.put('/recursos/' + id, params);
    }else{
      return this._apiService.post('/recursos',params);
    }
  }

  public recursoPorId(id:number) {
    return this._apiService.get('/recursos/' + id);
  }


}
