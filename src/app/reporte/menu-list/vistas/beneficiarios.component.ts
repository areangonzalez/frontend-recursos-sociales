import { Component, OnInit } from '@angular/core';
import { MensajesService, BeneficiarioService } from '../../../core/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reporte-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  // styleUrls: ['./reporte.component.sass'],
})
export class BeneficiariosComponent implements OnInit {

  public busqueda: any = {page: 0, pagesize: 20};
  public beneficiariosLista: any[] = [];
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "monto_acreditado": 0, "monto_baja": 0, "cantRegistros": 0, "totalRegistros": 0 };
  public listaLocalidades: any[];

  constructor(
    private _route: ActivatedRoute,
    private _mensajeService: MensajesService,
    private _beneficiariosService: BeneficiarioService,
  ){}

  ngOnInit() {
    this.configBeneficiario(this._route.snapshot.data["beneficiarios"]);
    this.listaLocalidades = this._route.snapshot.data["localidades"];
    //this.buscar(this.busqueda);
  }
  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
  public buscar(apiBusqueda:any) {
    // Agrego la paginacion a la busqueda avanzada
    Object.assign(apiBusqueda, {"page": 0, "pagesize": 20});
    // agrego la busqueda en la nueva variable
    Object.assign(this.busqueda, apiBusqueda);
    // configuro para que se dirija a la primera pagina
    this.configPaginacion.page = 1;
    // realizo la busqueda
    this.listarBeneficiarios(apiBusqueda);
  }

  //public listarBeneficiarios(params: object) {
  public listarBeneficiarios(params:object) {
    this._beneficiariosService.buscar(params).subscribe(
      beneficiarios => {
        this.configBeneficiario(beneficiarios);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  /**
   * @function cambioPagina realiza el cambio de pagina
   * @param page numero de pagina
   */
  public cambioPagina(page:number){
    let newPage = page - 1;
    Object.assign(this.busqueda,{"page": newPage});
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

    public configBeneficiario(beneficiarios:any) {
      this.configPaginacion.colleccionSize = beneficiarios.total_filtrado;
        this.configPaginacion.pageSize = beneficiarios.pagesize;
        this.configPaginacion.monto_acreditado = beneficiarios.monto_acreditado;
        this.configPaginacion.monto_baja = beneficiarios.monto_baja;
        this.configPaginacion.monto_sin_acreditar = beneficiarios.monto_sin_acreditar;
        this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, beneficiarios.total_filtrado, beneficiarios.pagesize);
        this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, beneficiarios.total_filtrado, beneficiarios.pagesize);
        // total de registros
        this.beneficiariosLista = beneficiarios.resultado;
    }

}
