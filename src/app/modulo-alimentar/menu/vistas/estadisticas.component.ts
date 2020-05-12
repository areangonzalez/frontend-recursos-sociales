import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ma-estadisticas',
    templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent implements OnInit {
  public maPorLocalidad: any = [];

  constructor(
      private _router: Router, private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.maPorLocalidad = this._route.snapshot.data["estadisticas"];
  }
}
