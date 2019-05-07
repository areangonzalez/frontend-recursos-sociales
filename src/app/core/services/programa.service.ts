import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from './api.service';

@Injectable()
export class ProgramaService implements Resolve<any> {

  constructor(
    private _apiService: ApiService
  ){}

  public listar() {
    return this._apiService.get('/programas');
  }

  public buscarPorId(id:number) {
    return this._apiService.get('/programas/' + id);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<any>|Promise<any>|any {
    return this._apiService.get('/programas');
    }

}
