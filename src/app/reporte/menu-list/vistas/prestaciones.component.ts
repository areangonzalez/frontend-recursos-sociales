import { Component, OnInit } from '@angular/core';
import { MensajesService, RecursoSocialService, LoaderService } from '../../../core/services';
import { UtilService } from '../../../core/utils';

@Component({
  selector: 'reporte-prestaciones',
  templateUrl: './prestaciones.component.html',
  // styleUrls: ['./reporte.component.sass'],
})
export class PrestacionesComponent implements OnInit {

  public busqueda: any = {page: 0, pagesize: 20};
  public recursosLista: any[] = [];
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "monto_sin_acreditar": 0, "monto_acreditado": 0, "monto_baja": 0, "cantRegistros": 0, "totalRegistros": 0 };

  constructor(
    private _mensajeService: MensajesService,
    private _util: UtilService,
    private _recursoService: RecursoSocialService,
    private _loaderService: LoaderService
  ){}

  ngOnInit() {

    this.buscar(this.busqueda);
  }
  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
  public buscar(apiBusqueda:any) {
    this.busqueda = {};
    // Agrego la paginacion a la busqueda avanzada
    Object.assign(apiBusqueda, {"page": 0, "pagesize": 20});
    // agrego la busqueda en la nueva variable
    Object.assign(this.busqueda, apiBusqueda);
    // configuro para que se dirija a la primera pagina
    this.configPaginacion.page = 1;
    // realizo la busqueda
    this.listarRecursos(apiBusqueda);
  }


  /**
   * @function listarRecursos obtiene el listado de prestaciones segun sus parametros
   * @param params parametros de busquedas para las prestaciones
   */
  public listarRecursos(params:object){
    console.log(params);
    this._recursoService.buscar(params).subscribe(
      recursos => {
        this.configPaginacion.colleccionSize = recursos.total_filtrado;
        this.configPaginacion.pageSize = recursos.pagesize;
        this.configPaginacion.monto_acreditado = recursos.monto_acreditado;
        this.configPaginacion.monto_baja = recursos.monto_baja;
        this.configPaginacion.monto_sin_acreditar = recursos.monto_sin_acreditar;
        this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, recursos.total_filtrado, recursos.pagesize);
        this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, recursos.total_filtrado, recursos.pagesize);
        // total de registros
        this.recursosLista = recursos.resultado;
      },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  /**
   * @function cambioPagina realiza el cambio de pagina
   * @param page numero de pagina
   */
  public cambioPagina(page:number){
    let newPage = page - 1
    Object.assign(this.busqueda,{"page": newPage});
    this.listarRecursos(this.busqueda);
  }

  /**
     * @function rangoInicialXpagina funcion que calcula el rango inicial
     * @param pagina numero de pagina
     * @param total cantidad de registros
     */
    public rangoInicialXpagina(pagina: number, total: number, pagesize: number){
      let paginaReal = pagina - 1;
      let rangoInicial: number = 0;
      if (total !== 0){
        rangoInicial = paginaReal * pagesize + 1;
      }
      return rangoInicial;
    }
    /**
     * @function rangoFinalXpagina funcion que calcula el rango final
     * @param pagina numero de pagina
     * @param total cantidad de registros
     */
    rangoFinalXpagina(pagina: number, total: number, pagesize:number){
      let cantRegistrosXpag = (pagina * pagesize);
      let rangoFinal: number = 0;
      if (total !== 0){
        rangoFinal = (cantRegistrosXpag < total) ? cantRegistrosXpag : total;
      }
      return rangoFinal;
    }

    public ordenarLista(sort:any) {
      console.log(sort);
      this.buscar(sort);
    }

}
