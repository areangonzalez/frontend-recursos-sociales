import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';

@Injectable()
export class DescargasService {
    constructor(
        private _apiService: ApiService
    ) { }

    descargarExcel(params) {
      let headers = new Headers();
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, params);
      headers.append('Content-type', 'aplication/json');
      headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      let options: object = {
        responseType: 'blob',
        params: httpParams,
      };
      return this._apiService.getFile('/export/exportar-prestaciones-xls', options);
    }
}
