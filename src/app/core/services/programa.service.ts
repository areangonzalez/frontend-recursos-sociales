import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable()
export class ProgramaService {

  constructor(
    private _apiService: ApiService
  ){}


  setProgramaUrl(programa: object) {
    localStorage.setItem("programaUrl", JSON.stringify(programa));
  }

  clearProgramaUrl() {
    localStorage.clear();
  }

  getProgramaUrl() {
    return JSON.parse(localStorage.getItem('programaUrl'));
  }

  listar() {
    return this._apiService.get('/programas');
  }




}
