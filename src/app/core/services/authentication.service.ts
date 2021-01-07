import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private _apiService: ApiService,private _jwtService: JwtService) {
  }

  /**
   * verifico si esta logueado el usuario
   */
  public get loggedIn(): User {
    let user: User = this._jwtService.getToken();
    return user;
  }

  login(params: any) {
      return this._apiService.post('/usuarios/login', { username: params.username, password_hash: params.password })
          .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
              this._jwtService.saveToken(user);
            }
            return user;
          }));
  }

  logout() {
    // remove user from local storage to log user out
    this._jwtService.destroyToken();
  }

  getUserName() {
    let userLogin = this._jwtService.getToken();
    return userLogin.datosToken.username;
  }

}
