import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuloAlimentarService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'reporte-estadisticas',
  templateUrl: './modulo-alimentar.component.html'
})
export class ModuloAlimentarComponent implements OnInit {
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "monto_acreditado": 0, "monto_baja": 0, "cantRegistros": 0, "totalRegistros": 0 };
  public busqueda: any = {page: 0, pagesize: 20};
  public listaLocalidades: any = [];
  public beneficiariosLista: any = [];

  constructor(
    private _route: ActivatedRoute, private _moduloAlimentarService: ModuloAlimentarService,
    private _mensajeService: MensajesService
  ){}

  ngOnInit() {
    this.listaLocalidades = this._route.snapshot.data["localidades"];
    this.configBeneficiario(this._route.snapshot.data["moduloAlimentar"]);
  }

  /**
   * Se configura el listado y paginado de la prestacion de modulo alimenticio
   * @param beneficiarios
   */
  public configBeneficiario(beneficiarios:any) {
    this.configPaginacion.colleccionSize = beneficiarios.total_filtrado;
      this.configPaginacion.pageSize = beneficiarios.pagesize;
      this.configPaginacion.monto_acreditado = 0;
      this.configPaginacion.monto_baja = 0;
      this.configPaginacion.monto_sin_acreditar = 0;
      this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, beneficiarios.total_filtrado, beneficiarios.pagesize);
      this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, beneficiarios.total_filtrado, beneficiarios.pagesize);
      // total de registros
      this.beneficiariosLista = beneficiarios.resultado;
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

    /**
     * @function cambioPagina realiza el cambio de pagina
     * @param page numero de pagina
     */
    public cambioPagina(page:number){
      let newPage = page - 1;
      Object.assign(this.busqueda,{"page": newPage});
      this.listarPrestacionesModuloAlimentar(this.busqueda);
    }

    public listarPrestacionesModuloAlimentar(params:object) {
      this._moduloAlimentarService.buscar(params).subscribe(
        beneficiarios => {
          this.configBeneficiario(beneficiarios);
        }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }



}
