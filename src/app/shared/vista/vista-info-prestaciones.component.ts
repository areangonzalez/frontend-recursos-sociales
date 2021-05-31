import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'shared-vista-info-prestaciones',
  templateUrl: './vista-info-prestaciones.component.html',
  styleUrls: ['./vista-info-prestaciones.component.sass'],
  providers: [NgbTooltipConfig]
})
export class VistaInfoPrestacionesComponent implements OnInit {
  @Input("recursos") public recursos:any;
  @Output("cambioEstado") public cambioEstado = new EventEmitter();

  constructor(
    configTooltip: NgbTooltipConfig
  ){
    configTooltip.placement = 'top';
    configTooltip.triggers = 'hover';
  }

  ngOnInit() {}

  actualizarRecurso(estado:any){
    if (estado) {
      this.cambioEstado.emit(estado);
    }
  }

}
