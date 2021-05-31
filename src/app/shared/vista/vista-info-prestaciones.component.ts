import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { RecursoSocialService, MensajesService } from 'src/app/core/services';

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
    configTooltip: NgbTooltipConfig, private _recursoService: RecursoSocialService, private _msj: MensajesService
  ){
    configTooltip.placement = 'top';
    configTooltip.triggers = 'hover';
  }

  ngOnInit() {}

  actualizarRecurso(estado:any, recursoid: number){
    if (estado) {
      this.obtenerRecurso(recursoid);
      this.cambioEstado.emit(estado);
    }
  }

  obtenerRecurso(id: number) {
    this._recursoService.recursoPorId(id).subscribe(
      respuesta => {
        this.recurso = respuesta;
        this.listadoCuotas = respuesta.lista_cuota;
      }, error => { this._msj.cancelado(error, [{name:''}]); });
  }

}
