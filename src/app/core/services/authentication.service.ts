import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private _apiService: ApiService,private _jwtService: JwtService) {
    this.currentUserSubject = new BehaviorSubject<User>(this._jwtService.getToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * verifico si esta logueado el usuario
   */
  public get loggedIn(): User {
    return this.currentUserSubject.value;
  }

  login(params: any) {
      return this._apiService.post('/usuarios/login', { username: params.username, password_hash: params.password })
          .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
              this._jwtService.saveToken(user);
              this.currentUserSubject.next(user);
            }
            return user;
          }));
  }

  logout() {
    // remove user from local storage to log user out
    this._jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  getUserName() {
    let userLogin = this._jwtService.getToken();
    return userLogin.datosToken.username;
  }

}
