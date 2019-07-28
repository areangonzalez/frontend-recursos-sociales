import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reporte-estadisticas',
  templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent implements OnInit {
  public listaLocalidades: any = [];
  public listaProgramas: any = [];
  public listaTipoPrestaciones: any = [];
  constructor(
    private _route: ActivatedRoute
  ){}

  ngOnInit() {
    this.listaLocalidades = this._route.snapshot.data["localidades"];
    this.listaProgramas = this._route.snapshot.data["programas"];
    this.listaTipoPrestaciones = this._route.snapshot.data["tipoPrestaciones"];
  }

}
