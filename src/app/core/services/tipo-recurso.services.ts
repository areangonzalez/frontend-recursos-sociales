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

    return this._apiService.get('/tipo-recurso-socials',httpParams);
  }

/* [
        {"id":1, "nombre": "Alimentación", "programaid": [4,5]},
        {"id":2, "nombre": "Empleo / Formación laboral", "programaid": "1,4,5"},
        {"id":4, "nombre": "Mejoramiento habitacional", "programaid": ["2,4,5"]}
    ] */

}
