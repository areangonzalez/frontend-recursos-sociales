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
  @Input("ordenarMonto") public monto:string = "";
  @Input("ordenarFechaAlta") public fechaAlta:string = "";
  @Input("ordenarColumna") public ordenarColumna: any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  @Output("ordenar") public ordenar = new EventEmitter();

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
      let info = "Acreditacion: " + fechaA + " - Baja: " + fechaB;
      return info;
    }else if (acreditacion) {
      let fecha =datePipe.transform(acreditacion, 'dd/MM/yyyy');
      return "Acreditacion: " + fecha;
    }else if (baja) {
      let fecha = datePipe.transform(baja, 'dd/MM/yyyy');
      return "Baja: " + fecha;
    }
  }

  public direccion(lugar) {
    let dir = "";
    dir += lugar['localidad'];
    dir += (lugar['barrio'] != '') ? " - " + lugar['barrio'] : '';
    dir += (lugar['calle'] != '') ? ' - ' + lugar['calle'] + ' ' + lugar['altura'] : '';
    dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
    dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
    dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

    return dir;
  }

  public ordenarMonto() {
    this.ordenarColumna = (this.ordenarColumna != "monto") ? this.ordenarColumna = "monto" : this.ordenarColumna = "-monto";
    this.ordenar.emit(this.ordenarColumna);
  }

  public ordenarFecha() {
    this.ordenarColumna = (this.ordenarColumna != "fecha_alta") ? this.ordenarColumna = "fecha_alta" : this.ordenarColumna = "-fecha_alta";
    this.ordenar.emit(this.ordenarColumna);
  }

  public datosCuota(recurso: any) {
    let cuota: any = {};
    cuota["cuota"] = recurso.cuota;
    cuota["cant_cuota"] = recurso.cant_cuota + 1;
    cuota["monto"] = recurso.monto;
    cuota["monto_mensual"] = recurso.monto_mensual;
    cuota["monto_acreditado"] = recurso.monto_acreditado;
    cuota["monto_resto"] = recurso.monto_resto;

    return cuota;
  }
}
