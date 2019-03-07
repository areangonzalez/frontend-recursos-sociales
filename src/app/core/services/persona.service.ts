import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class PersonaService {

  constructor(
    private _apiService: ApiService
  ){}

  public buscar(params:object) {
    let httpParams = new HttpParams();
    httpParams = this._apiService.formatParams(httpParams, params);

    return this._apiService.get('/personas',httpParams);
  }

  public guardar(params:object, id:any) {
    if( id !== '' ){ //editar persona
      return this._apiService.put('/personas/' + id, params);
    }else{ // crear persona
      return this._apiService.post('/personas', params);
    }
  }

  public personaPorId(id:number){
    return this._apiService.get('/personas/' + id);
  }
}
