import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'shared-vista-info-recurso',
  templateUrl: './vista-info-recurso.component.html',
  styleUrls: ['./vista-info-recurso.component.sass'],
  providers: [NgbTooltipConfig]
})
export class VistaInfoRecursoComponent implements OnInit {
  @Input("recurso") public recurso:any;
  @Input("listadoCuotas") public listadoCuotas: any;
  @Output("cambioEstado") public cambioEstado = new EventEmitter();

  constructor(
    configTooltip: NgbTooltipConfig
  ){
    configTooltip.placement = 'top';
    configTooltip.triggers = 'hover';
  }

  ngOnInit() {
  }

  mostrarFA(estado:any){
    this.recurso.acreditacion = (estado == true) ? true : false;
    this.cambioEstado.emit(estado);
  }

  mostrarFB(estado:any){
    this.recurso.baja = (estado == true) ? true : false;
    this.cambioEstado.emit(estado);
  }
}
