import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from "../../core/services";
import { LoaderService } from "../../core/services";

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    public isCollapsed = true;
    public mostrar: boolean = false;
    public nombreUsuario: string = "";

    constructor(
        private _router: Router,
        private _authentication: AuthenticationService,
        private _loaderService: LoaderService
    ) { }

    ngOnInit() {
      this.nombreUsuario = this._authentication.loggedIn.username;
    }

    estoyLogueado(){
      return true;
    }

    cerrarSesion(){
      this._loaderService.show();
      setTimeout(() => {
        this._authentication.logout();
        this._loaderService.hide();
        this._router.navigate(['/login']);
       }, 1000);
    }

    mostrarMenu(){
      this.mostrar = !this.mostrar;
    }

    ocultarMenu(){
      this.mostrar = false;
    }

}
