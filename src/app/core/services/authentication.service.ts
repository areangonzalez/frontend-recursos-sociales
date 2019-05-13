import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(
      private _apiService: ApiService,
      private _jwtService: JwtService,
    ) { }

    login(params) {
        return this._apiService.post('/usuarios/login', { username: params.username, password_hash: params.password })
            .pipe(map((res: any) => {
              // login successful if there's a jwt token in the response
              if (res && res.access_token) {
                  let data = { username: '', token:'' };
                  data.username = res.username;
                  data.token = res.access_token;
                  this._jwtService.saveToken(data);
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this._jwtService.destroyToken();
    }

    loggedIn() {
      let userLogin = this._jwtService.getToken();
      if(userLogin && userLogin.datosToken) {
        return true;
      }else{
        return false;
      }
    }

    getUserName() {
      let userLogin = this._jwtService.getToken();

      return userLogin.datosToken.username;
    }

}
