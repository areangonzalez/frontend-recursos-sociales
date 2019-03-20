import { Component, OnInit } from '@angular/core';
import { MensajesService, RecursoSocialService, LoaderService, BeneficiarioService } from '../../../core/services';
import { UtilService } from '../../../core/utils';

@Component({
  selector: 'reporte-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  // styleUrls: ['./reporte.component.sass'],
})
export class BeneficiariosComponent implements OnInit {

  public busqueda: any = {page: 0, pagesize: 20};
  public beneficiariosLista: any[] = [];
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "monto_total": 0, "cantRegistros": 0, "totalRegistros": 0 };

  constructor(
    private _mensajeService: MensajesService,
    private _util: UtilService,
    private _beneficiariosService: BeneficiarioService,
    private _loaderService: LoaderService
  ){}

  ngOnInit() {

    this.buscar(this.busqueda);
    this.listarBeneficiarios(this.busqueda);
  }
  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
  public buscar(apiBusqueda:any) {
    apiBusqueda["page"] = 0;
    apiBusqueda["pagesize"] = 5;
    this.busqueda = apiBusqueda;
    this.configPaginacion.page = 1;
    this.listarBeneficiarios(apiBusqueda);
  }

  //public listarBeneficiarios(params: object) {
  public listarBeneficiarios(params:object) {
    this._beneficiariosService.buscar(params).subscribe(
      beneficiarios => {
        this.configPaginacion.colleccionSize = beneficiarios.total_filtrado;
        this.configPaginacion.pageSize = beneficiarios.pagesize;
        this.configPaginacion.monto_total = beneficiarios.monto_total;
        this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, beneficiarios.total_filtrado, beneficiarios.pagesize);
        this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, beneficiarios.total_filtrado, beneficiarios.pagesize);
        // total de registros
        this.beneficiariosLista = beneficiarios.resultado;
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  /**
   * @function cambioPagina realiza el cambio de pagina
   * @param page numero de pagina
   */
  public cambioPagina(page:number){
    this.busqueda["page"] = page - 1;
    this.listarBeneficiarios(this.busqueda);
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
