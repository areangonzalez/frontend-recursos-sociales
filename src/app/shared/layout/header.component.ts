import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from "../../core/services";

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    public isCollapsed = true;
    public mostrar: boolean = false;

    constructor(
        private _router: Router,
        private _authentication: AuthenticationService
    ) { }

    ngOnInit() {
    }

    estoyLogueado(){
      return true;
    }

    cerrarSesion(){
      this._authentication.logout();
      this._router.navigate(['/login']);
    }

    mostrarMenu(){
      this.mostrar = !this.mostrar;
    }

    ocultarMenu(){
      this.mostrar = false;
    }



}
