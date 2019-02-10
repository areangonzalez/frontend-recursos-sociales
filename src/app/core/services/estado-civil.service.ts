import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable()
export class EstadoCivilService {

  constructor(
    private _apiService: ApiService
  ){}

  listar() {
    return this._apiService.get('/estado-civils');
  }

}
