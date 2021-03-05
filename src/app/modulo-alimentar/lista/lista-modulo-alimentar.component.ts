import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'lista-modulo-alimentar',
  templateUrl: './lista-modulo-alimentar.component.html',
  styleUrls: ['./lista-modulo-alimentar.component.sass']
})
export class ListaModuloAlimentarComponent implements OnInit {
  @Input("beneficiariosLista") public beneficiariosLista:any;
  @Input("configPaginacion") public configPaginacion:any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();

  constructor(){}

  ngOnInit() {
  }

  cambioPagina(page){
    this.cambioDePagina.emit(page);
  }

  public actualizarLista(estado:any){
    if (estado){
      this.cambioDePagina.emit(this.configPaginacion.page);
    }
  }

  public direccion(lugar){
    let dir = "";
    dir += lugar['localidad'] + " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura'];
    dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
    dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
    dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

    return dir;
  }

}
