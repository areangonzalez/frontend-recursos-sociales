import { Component, OnInit } from '@angular/core';
import { MensajesService, LoaderService, RecursoSocialService, ProgramaService } from '../../../core/services';
import { UtilService } from '../../../core/utils';

@Component({
  selector: 'reporte-estadisticas',
  templateUrl: './estadisticas.component.html',
  // styleUrls: ['./reporte.component.sass'],
})
export class EstadisticasComponent implements OnInit {

  public prestacionesLista: any[] = [];

  constructor(
    private _mensajeService: MensajesService,
    private _programaService: ProgramaService
  ){}

  ngOnInit() {
   this.listarPrestacionesPorPrograma();
  }

  /**
   * @function listarPrestaciones obtiene el listado de prestaciones segun sus parametros
   * @param params parametros de busquedas para las prestaciones
   */
  public listarPrestacionesPorPrograma(){
    this._programaService.listar().subscribe(
      recursos => {
        console.log(recursos);
        // this.configPaginacion.colleccionSize = recursos.total_filtrado;
        // this.configPaginacion.pageSize = recursos.pagesize;
        // this.configPaginacion.monto_total = recursos.monto_total;
        // this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, recursos.total_filtrado, recursos.pagesize);
        // this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, recursos.total_filtrado, recursos.pagesize);
        // total de registros
        // this.prestacionesLista = recursos.resultado;
        this.prestacionesLista = recursos;
      },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

}
