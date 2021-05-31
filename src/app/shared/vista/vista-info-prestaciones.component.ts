import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { BeneficiarioService, MensajesService } from 'src/app/core/services';

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
    configTooltip: NgbTooltipConfig, private _beneficiarioService: BeneficiarioService, private _msj: MensajesService
  ){
    configTooltip.placement = 'top';
    configTooltip.triggers = 'hover';
  }

  ngOnInit() {}

  actualizarRecurso(estado:any, beneficiarioid: number){
    if (estado) {
      this.obtenerBeneficiario(beneficiarioid);
      this.cambioEstado.emit(estado);
    }
  }

  obtenerBeneficiario(id: number) {
    this._beneficiarioService.beneficiarioPorId(id).subscribe(
      respuesta => {
        this.recursos = respuesta.recurso_lista;
      }, error => { this._msj.cancelado(error, [{name:''}]); });
  }

}
