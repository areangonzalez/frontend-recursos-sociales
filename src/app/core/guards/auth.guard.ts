import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService, JwtService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _auth: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this._auth.loggedIn) {
        // logged in so return true
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;

      /* let currentUser = this._jwtService.getToken();
      const isLoggedIn = currentUser && currentUser.datosToken && currentUser.datosToken.token;
      // verifico si el usuario esta logueado
      if (isLoggedIn) {
        // checkeo if la ruta esta restringida por el rol
        if (route.data.roles && route.data.roles.index) {

        }


      } else {

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      } */


    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    }
}
