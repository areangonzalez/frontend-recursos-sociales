import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    public isCollapsed = true;

    /* constructor(
        private _router: Router
    ) { } */

    ngOnInit() {
    }

    estoyLogueado(){
      return true;
    }

    cerrarSesion(){
      console.log("cierre");
    }

}
