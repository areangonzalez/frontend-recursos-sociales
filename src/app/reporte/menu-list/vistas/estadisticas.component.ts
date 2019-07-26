import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reporte-estadisticas',
  templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent implements OnInit {
  public listaLocalidades: any = [];
  constructor(
    private _route: ActivatedRoute
  ){}

  ngOnInit() {
    this.listaLocalidades = this._route.snapshot.data["localidades"];
  }

}
