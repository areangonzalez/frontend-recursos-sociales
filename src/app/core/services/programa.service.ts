import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class ProgramaService {
  //private programaId: IProgramaId;

  constructor(
    private _apiService: ApiService
  ){}

  listar() {
    return this._apiService.get('/programas');
  }

}
