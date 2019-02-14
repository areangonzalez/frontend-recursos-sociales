import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class TipoRecursoService {

  constructor(
    private _apiService: ApiService
  ){}

  buscarPorPrograma(programaid) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set("programaid", programaid);

    return this._apiService.get('/tipo-recursos',httpParams);
  }

}
