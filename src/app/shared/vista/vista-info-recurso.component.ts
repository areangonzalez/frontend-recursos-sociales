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
  @Output("cambioEstado") public cambioEstado = new EventEmitter();

  constructor(
    configTooltip: NgbTooltipConfig
  ){
    configTooltip.placement = 'top';
    configTooltip.triggers = 'hover';
  }

  ngOnInit() {
  }

  actualizarRecurso(estado:any, recursoid: number){
    if (estado) {
      this.cambioEstado.emit(estado);
    }
  }
}
