import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService, JwtService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _auth: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let autorizacion = this._auth.loggedIn;
      const roles = route.data['rol'];
      let cont = 0;
      if (roles) {
        for (let rol of roles) {
          if (rol === autorizacion.rol) {
            cont++;
          }
        }
        return autorizacion && cont > 0;
      }
      if (autorizacion) { return true;}
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    }

}
