import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from "@angular/common";
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

  public actualizarLista(estado:any){
    if (estado){
      this.cambioDePagina.emit(this.configPaginacion.page);
    }
  }

  public infoAdicional(acreditacion, baja) {
    let datePipe = new DatePipe('en-US');
    if (acreditacion && baja) {
      let fechaA = datePipe.transform(acreditacion, 'dd/MM/yyyy');
      let fechaB = datePipe.transform(baja, 'dd/MM/yyyy');
      let info = "acreditacion: " + fechaA + " - Baja: " + fechaB;
      return info;
    }else if (acreditacion) {
      let fecha =datePipe.transform(acreditacion, 'dd/MM/yyyy');
      return "Acreditacion: " + fecha;
    }else if (baja) {
      let fecha = datePipe.transform(baja, 'dd/MM/yyyy');
      return "Baja: " + fecha;
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
