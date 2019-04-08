import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    url: string = environment.baseUrl + '/usuario/login';
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.url, { username: username, password_hash: password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.access_token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token-rrss', JSON.stringify({ username, token: res.access_token }));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token-rrss');
    }
}
