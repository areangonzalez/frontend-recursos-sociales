import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private _api: ApiService) { }

  public listar() {
    return this._api.get("/rols");
  }


}
