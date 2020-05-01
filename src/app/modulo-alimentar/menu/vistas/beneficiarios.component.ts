import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuloAlimentarService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'ma-reporte-beneficiario-vista',
  templateUrl: './beneficiarios.component.html'
})
export class BeneficiariosComponent implements OnInit {
  public orden: string = "-fecha_alta"; // ordenamiento del listado predefinido
  public busqueda: any = {page: 0, pagesize: 20, sort: this.orden}; // parametros de la busqueda
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "monto_acreditado": 0, "monto_baja": 0, "cantRegistros": 0, "totalRegistros": 0 };
  public listaLocalidades: any = [];
  public listaTipoResponsables: any = [];
  public listaDelegaciones: any = [];
  public listaMunicipios: any = [];
  public listaComisionesDeFomentos: any = [];
  public beneficiariosLista: any = [];

  constructor(
    private _route: ActivatedRoute, private _moduloAlimentarService: ModuloAlimentarService,
    private _mensajeService: MensajesService
  ){}

  ngOnInit() {
    this.listaLocalidades = this._route.snapshot.data["localidades"];
    this.listaTipoResponsables = this._route.snapshot.data["tipoResponsables"];
    this.listaMunicipios = this._route.snapshot.data["municipios"];
    this.listaComisionesDeFomentos = this._route.snapshot.data["comisionesDeFomento"];
    this.listaDelegaciones = this._route.snapshot.data["delegaciones"];
    this.configModuloAlimentario(this._route.snapshot.data["moduloAlimentar"]);
  }

  /**
   * Se configura el listado y paginado de la prestacion de modulo alimenticio
   * @param beneficiarios
   */
  public configModuloAlimentario(beneficiarios:any) {
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
    /**
     * @function listarPrestacionesModuloAlimentar obtiene el listado de prestaciones de modulo alimentario segun sus parametros
     * @param params parametros de busquedas para las prestaciones de modulo alimentario
     */
    public listarPrestacionesModuloAlimentar(params:object) {
      this._moduloAlimentarService.buscar(params).subscribe(
        beneficiarios => {
          this.configModuloAlimentario(beneficiarios);
        }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }

    public buscar(apiBusqueda:any) {
      this.busqueda = {};
      if (Object.entries(apiBusqueda).length == 0) {
        this.orden = "-fecha_alta";
      }
      // Agrego la paginacion a la busqueda avanzada
      Object.assign(apiBusqueda, {"page": 0, "pagesize": 20, "programaid": 6, "sort": this.orden});
      // agrego la busqueda en la nueva variable
      Object.assign(this.busqueda, apiBusqueda);
      // configuro para que se dirija a la primera pagina
      this.configPaginacion.page = 1;
      // realizo la busqueda
      this.listarPrestacionesModuloAlimentar(apiBusqueda);
    }
}
