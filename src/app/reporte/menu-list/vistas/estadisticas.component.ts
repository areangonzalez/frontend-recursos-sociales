import { Component, OnInit } from '@angular/core';
import { MensajesService, LoaderService, RecursoSocialService, ProgramaService } from '../../../core/services';
import { UtilService } from '../../../core/utils';

@Component({
  selector: 'reporte-estadisticas',
  templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent implements OnInit {

  constructor(
    private _mensajeService: MensajesService,
    private _programaService: ProgramaService
  ){}

  ngOnInit() {
  }

}
