import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reporte-estadisticas',
  templateUrl: './modulo-alimentar.component.html'
})
export class ModuloAlimentarComponent implements OnInit {
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "monto_acreditado": 0, "monto_baja": 0, "cantRegistros": 0, "totalRegistros": 0 };

  public listaLocalidades: any = [];
  public listaProgramas: any = [];
  public listaTipoPrestaciones: any = [];
  public listaModuloAlimentar: any = [];

  constructor(
    private _route: ActivatedRoute
  ){}

  ngOnInit() {
    this.listaLocalidades = this._route.snapshot.data["localidades"];
    this.listaProgramas = this._route.snapshot.data["programas"];
    this.listaTipoPrestaciones = this._route.snapshot.data["tipoPrestaciones"];
    this.listaModuloAlimentar = this._route.snapshot.data["moduloAlimentar"];
  }



}
