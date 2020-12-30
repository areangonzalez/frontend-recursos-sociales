import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private _api: ApiService) { }

  public listar() {
    return this._api.get('/permisos');
  }
}
