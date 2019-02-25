import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lista-recurso',
  templateUrl: './lista-recurso.component.html',
  styleUrls: ['./lista-recurso.component.sass']
})
export class ListaRecursoComponent implements OnInit {
  @Input("recursosLista") public recursosLista:any;
  @Input("configPaginacion") public configPaginacion:any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();

  constructor(){}

  ngOnInit() {
  }

  cambioPagina(page){
    this.cambioDePagina.emit(page);
  }

}
