import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

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
    ) { }

    ngOnInit() {
    }

    estoyLogueado(){
      return true;
    }

    cerrarSesion(){
      console.log("cierre");
    }

    mostrarMenu(){
      this.mostrar = !this.mostrar;
    }

    ocultarMenu(){
      this.mostrar = false;
    }

}
