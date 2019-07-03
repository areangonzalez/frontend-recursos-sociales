import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
//import * as FileSaver from "file-saver";

import { JwtService } from './jwt.service';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable()
export class DescargasService {
  private url = environment.baseUrl;
    constructor(
        private http: HttpClient,
        private _apiService: ApiService,
        private jwtService: JwtService
    ) { }


    public exportarExcel(params: object){
        /* params['template'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        //return this._apiService.get('/recurso/exportar-prestaciones-xls', httpParams);
        return this.http.get('') */

        let datosToken: object = this.jwtService.getToken();
        let headers = new Headers();
        let httpParams = new HttpParams();
        httpParams = this._apiService.formatParams(httpParams, params);
        headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.set('Authorization', 'Bearer ' + datosToken['token']);

        let options: object = {
          responseType: 'blob',
          params: httpParams,
          headers: headers,
        };
        return this.http.get(this.url + '/recurso/exportar-prestaciones-xls', options);

    }
}
