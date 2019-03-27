import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'lista-programas',
  templateUrl: './lista-programas.component.html',
  styleUrls: ['./lista-programas.component.sass']
})
export class ListaProgramasComponent implements OnInit {
  @Input("prestacionesLista") public prestacionesLista:any;
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
