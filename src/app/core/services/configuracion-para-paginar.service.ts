import { Injectable } from '@angular/core';
import { ConfigurarPagina } from './../models';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionParaPaginarService {

  constructor() { }

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
     * Se configura paginacion
     * @param datos [object] objeto que contiene los datos (pagesize, page, total_filtrado) de paginacion
     * @param pagina [number] numero de pagina
     * @returns {ConfigurarPagina} devuelve un objeto de tipo <ConfigurarPagina> configuracion de paginas con sus rangos
     */
    public config(datos:any, pagina:number) {
      let configPaginacion:ConfigurarPagina = new ConfigurarPagina();
      configPaginacion.page = pagina;
      configPaginacion.colleccionSize = datos.total_filtrado;
      // tamaño pagina
      configPaginacion.pageSize = datos.pagesize;
      configPaginacion.cantRegistros = this.rangoInicialXpagina(configPaginacion.page, datos.total_filtrado, configPaginacion.pageSize);
      configPaginacion.totalRegistros = this.rangoFinalXpagina(configPaginacion.page, datos.total_filtrado, configPaginacion.pageSize);
      // total de registros
      return configPaginacion;
    }

    public paginarListado(pagina, pageSize, listado) {
      let nuevaLista: any = [];
      if (pagina > 1) {
        pagina = pagina - 1;
        let pageStart = pagina * pageSize;
        let pageEnd = pageStart + pageSize;
        nuevaLista = listado.slice(pageStart, pageEnd);
      }else{
        nuevaLista = listado.slice(0,pageSize);
      }

      return nuevaLista;
    }

}

