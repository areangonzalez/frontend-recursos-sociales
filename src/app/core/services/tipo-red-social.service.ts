import { Injectable } from "@angular/core";

import { ApiService } from './api.service';

@Injectable()
export class TipoRedSocialService {

  constructor(
    private _apiService: ApiService
  ){}

  listar() {
    return this._apiService.get('/tipo-red-socials');
  }

}
