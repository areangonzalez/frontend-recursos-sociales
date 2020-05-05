import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ma-estadisticas',
    templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent implements OnInit {

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
    }
}
