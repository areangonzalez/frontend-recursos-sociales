import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
//import * as FileSaver from "file-saver";

import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { getFileNameFromResponseContentDisposition, saveFile } from "../../shared/helpers/file-download-helper";

@Injectable()
export class DescargasService {
  private url = environment.baseUrl;
    constructor(
        private _apiService: ApiService,
        private jwtService: JwtService
    ) { }


    public exportarExcel(params: object){
        /* params['template'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        //return this._apiService.get('/recurso/exportar-prestaciones-xls', httpParams);
        return this.http.get('') */

        let headers = new Headers();
        let httpParams = new HttpParams();
        httpParams = this._apiService.formatParams(httpParams, params);
        headers.set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.set('X-Requested-With', 'XMLHttpRequest');

        let options: object = {
          responseType: ResponseContentType.Blob,
          params: httpParams,
          headers: headers,
        };
        return this._apiService.getFile('/recurso/exportar-prestaciones-xls', options);

    }

    downloadFile(params) {
      let headers = new Headers({
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'X-Requested-With': 'XMLHttpRequest',
        'observe': 'response'
      });
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, params);
      /* headers.set('Authorization', 'Bearer ' + datosToken['token']);
      headers.set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      headers.set('X-Requested-With', 'XMLHttpRequest'); */

      let options: object = {
        responseType: 'blob' as 'json',
        params: httpParams,
        headers: headers,
      };

      // Process the file downloaded
      return this._apiService.getFile('/recurso/exportar-prestaciones-xls', options);
  }
}
