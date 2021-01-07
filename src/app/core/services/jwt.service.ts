import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

    getToken() {
        return JSON.parse(localStorage.getItem('token-rrss'));
    }

    saveToken(datosToken: any) {
        localStorage.setItem('token-rrss', JSON.stringify(datosToken));
    }

    destroyToken() {
        localStorage.removeItem('token-rrss');
    }

}
