import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';
import { Subject, Observable } from "rxjs";

@Injectable()
export class ProgramaService {
  private subject = new Subject<any>();

  constructor(
    private _apiService: ApiService
  ){}


  setProgramaUrl(programa: object) {
    this.subject.next({ programa: programa  });
  }

  clearProgramaUrl() {
      this.subject.next();
  }

  getProgramaUrl(): Observable<any> {
      return this.subject.asObservable();
  }

  listar() {
    return this._apiService.get('/programas');
  }




}
