import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { RequestOptions, ResponseContentType, Http } from '@angular/http';
//import * as FileSaver from "file-saver";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { getFileNameFromResponseContentDisposition, saveFile } from "../../shared/helpers/file-download-helper";

@Injectable()
export class DescargasService {
  private baseUrl = environment.baseUrl;
    constructor(
        private _apiService: ApiService,
        private jwtService: JwtService,
        private http: HttpClient
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

    descarga(params) {
      let headers = new Headers();
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, params);
      // headers.set('Authorization', 'Bearer ' + datosToken['token']);
      headers.append('Access-Control-Allow-Origin', "*");
      headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      headers.append('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      headers.set('X-Requested-With', 'XMLHttpRequest');

      let options: object = {
        responseType: 'blob',
        params: httpParams,
      };

      //let options = new RequestOptions({responseType: 'blob' });
      //let options = new RequestOptions({headers: headers });
      //let path = 'https://miro.medium.com/max/700/1*nuFiuHGT-S-QAkt0vbQgZQ.png';
      //let path_2 = '../../../assets/img/manos-verdes.png';
      // Process the file downloaded
      return this._apiService.getFile('/export/exportar-prestaciones-xls', options);
//      return this.http.get(path, options);
    }

    /* downloadFile(params): Observable<Blob> {
        let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(this.baseUrl + '/recurso/exportar-prestaciones-xls', options)
        .pipe(map(res => res.blob()))
    } */
}
