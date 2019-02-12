import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class ProgramaService {
  //private programaId: IProgramaId;

  constructor(
    private _apiService: ApiService
  ){}

  public listar() {
    return this._apiService.get('/programas');
  }

  public buscarPorId(id:number) {
    return this._apiService.get('/programas/' + id);
  }

}
