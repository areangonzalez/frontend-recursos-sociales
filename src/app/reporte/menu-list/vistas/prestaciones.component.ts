import { Component, OnInit } from '@angular/core';
import { MensajesService, RecursoSocialService, DescargasService } from '../../../core/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reporte-prestaciones',
  templateUrl: './prestaciones.component.html'
})
export class PrestacionesComponent implements OnInit {

  public orden: string = "-fecha_alta"; // ordenamiento del listado predefinido
  public busqueda: any = {page: 0, pagesize: 20, sort: this.orden}; // parametros de la busqueda
  public recursosLista: any[] = []; // listado de las prestaciones
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1, "monto_sin_acreditar": 0, "monto_acreditado": 0, "monto_baja": 0, "cantRegistros": 0, "totalRegistros": 0 }; // configuracion de paginacion
  public listaProgramas: any[]; // listado de programas
  public listaLocalidades: any[]; // listado de localidades
  public listaTipoPrestacion: any[]; // listado de tipo de prestaciones
  public exportBusqueda: any; // contiene el objeto de busqueda para exportar
  /**
   * @param _mensajeService [Service] servicio que muestra los mensajes de errores
   * @param _recursoService [Service] servicio que realiza las busquedas para el listado de prestaciones
   * @param _route obtiene los listados.
   */
  constructor(
    private _mensajeService: MensajesService,
    private _route: ActivatedRoute,
    private _recursoService: RecursoSocialService,
    private _descargasService: DescargasService
  ){}

  ngOnInit() {
    // se inician las preferencias del componente
    this.listaProgramas = this._route.snapshot.data["programas"];
    this.listaLocalidades = this._route.snapshot.data["localidades"];
    this.listaTipoPrestacion = this._route.snapshot.data["tipoPrestacion"];
    this.listarPrestaciones(this._route.snapshot.data["prestaciones"]);
  }
  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
  public buscar(apiBusqueda:any) {
    this.busqueda = {};
    if (Object.entries(apiBusqueda).length == 0) {
      this.orden = "-fecha_alta";
    }
    // Agrego la paginacion a la busqueda avanzada
    Object.assign(apiBusqueda, {"page": 0, "pagesize": 20, "sort": this.orden});
    // agrego la busqueda en la nueva variable
    Object.assign(this.busqueda, apiBusqueda);
    // configuro para que se dirija a la primera pagina
    this.configPaginacion.page = 1;
    // realizo la busqueda
    this.listarRecursos(apiBusqueda);
    // Agrego la busqueda para exportar
    this.exportBusqueda = apiBusqueda;
  }


  /**
   * @function listarRecursos obtiene el listado de prestaciones segun sus parametros
   * @param params parametros de busquedas para las prestaciones
   */
  public listarRecursos(params:object){
    this._recursoService.buscar(params).subscribe(
      recursos => {
        this.listarPrestaciones(recursos);
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
    /**
     * Asigna el parametro para ordenar el listado
     * @param sort clave para el ordenamiento
     */
    public ordenarLista(sort:string) {
      this.orden = sort;
      Object.assign(this.busqueda, {"sort": sort})
      this.buscar(this.busqueda);
    }
    /**
     * Arma el listado de prestaciones y el paginado
     * @param prestacion objeto que contiene los parametros de paginacion y prestacion
     */
    public listarPrestaciones(prestacion:any) {
      this.configPaginacion.colleccionSize = prestacion.total_filtrado;
      this.configPaginacion.pageSize = prestacion.pagesize;
      this.configPaginacion.monto_acreditado = prestacion.monto_acreditado;
      this.configPaginacion.monto_baja = prestacion.monto_baja;
      this.configPaginacion.monto_sin_acreditar = prestacion.monto_sin_acreditar;
      this.configPaginacion.cantRegistros = this.rangoInicialXpagina(this.configPaginacion.page, prestacion.total_filtrado, prestacion.pagesize);
      this.configPaginacion.totalRegistros = this.rangoFinalXpagina(this.configPaginacion.page, prestacion.total_filtrado, prestacion.pagesize);
      // total de registros
      this.recursosLista = prestacion.resultado;
    }

    public exportarAexcel(exportar:boolean) {
      if (exportar){
        this._descargasService.exportarExcel(this.exportBusqueda).subscribe(
          datos => {
            console.log("son datos: ",datos);
        }, error => {console.log("errores: ",error);});
      }
    }

}
