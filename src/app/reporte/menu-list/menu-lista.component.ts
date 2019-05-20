import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'reporte-menu-lista',
    templateUrl: './menu-lista.component.html',
})
export class MenuListaComponent implements OnInit {

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
    }
}
