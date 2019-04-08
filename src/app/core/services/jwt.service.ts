import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

    getToken() {
        return localStorage.getItem('token-rrss');
    }

    saveToken(datosToken: object) {
        localStorage.setItem('token-rrss', JSON.stringify({ datosToken }));
    }

    destroyToken() {
        localStorage.removeItem('token-rrss');
    }

}
