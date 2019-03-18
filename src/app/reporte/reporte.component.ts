import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService, RecursoSocialService, LoaderService, BeneficiarioService } from '../core/services';
import { UtilService } from '../core/utils';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.sass'],
  providers: [NgbTabsetConfig]
})
export class ReporteComponent implements OnInit {

  public busqueda: any = {page: 0, pagesize: 20};
  public recursosLista: any[] = [];
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "monto_total": 0, "cantRegistros": 0, "totalRegistros": 0 };

  constructor(
    private _mensajeService: MensajesService,
    private _util: UtilService,
    private _recursoService: RecursoSocialService,
    private _beneficiariosService: BeneficiarioService,
    private _configTabSet: NgbTabsetConfig,
    private _loaderService: LoaderService
  ){
    _configTabSet.justify = 'center';
    _configTabSet.type = 'pills';
  }

  ngOnInit() {

    this.buscar(this.busqueda);
  }
  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
  public buscar(apiBusqueda:any) {
    apiBusqueda["page"] = 0;
    apiBusqueda["pagesize"] = 20;
    this.configPaginacion.page = 1;
    this.busqueda = apiBusqueda;
    this.listarRecursos(apiBusqueda);
  }


  /**
   * @function listarRecursos obtiene el listado de prestaciones segun sus parametros
   * @param params parametros de busquedas para las prestaciones
   */
  public listarRecursos(params:object){
    this._recursoService.buscar(params).subscribe(
      recursos => {
        this.configPaginacion.colleccionSize = recursos.total_filtrado;
        this.configPaginacion.pageSize = recursos.pagesize;
        this.configPaginacion.monto_total = recursos.monto_total;
        this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, recursos.total_filtrado, recursos.pagesize);
        this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, recursos.total_filtrado, recursos.pagesize);
        // total de registros
        this.recursosLista = recursos.resultado;
      },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public listarBeneficiarios(params: object) {
    this._beneficiariosService.listar().subscribe(
      beneficiarios => {
        console.log(beneficiarios);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  /**
   * @function cambioPagina realiza el cambio de pagina
   * @param page numero de pagina
   */
  public cambioPagina(page:any){
    this.busqueda["page"] = page - 1;
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

}

