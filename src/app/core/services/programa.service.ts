import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { ApiService } from './api.service';

@Injectable()
export class ProgramaService {
  //private programaId: IProgramaId;
  private programaid: Subject<any> = new Subject<any>();

  constructor(
    private _apiService: ApiService
  ){}


  setProgramaUrl(programaid: number) {
    this.programaid.next(programaid);
    //console.log(this.programaId$);
    //this.programaId$.next(programaId);
    //localStorage.setItem("programaid", programaid.toString());
  }

  clearProgramaUrl() {
    //localStorage.clear();
    this.programaid.next();
  }

  getProgramaUrl(){
    return this.programaid.asObservable();
    //return this.programaId$.asObservable();
    //return parseInt(localStorage.getItem('programaid'));
  }

  listar() {
    return this._apiService.get('/programas');
  }




}
