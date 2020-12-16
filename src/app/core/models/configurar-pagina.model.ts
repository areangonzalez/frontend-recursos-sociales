export interface IConfigurarPagina {
  colleccionSize: number,
  pageSize: number,
  page: number,
  cantRegistros: number,
  totalRegistros: number
}
/**
 * Clase que construye el objeto de la configuracion de pagina
 */
export class ConfigurarPagina implements IConfigurarPagina {
  public colleccionSize: number;
  public pageSize: number;
  public page: number;
  public cantRegistros: number;
  public totalRegistros: number;


  constructor() {
    this.colleccionSize = 0;
    this.pageSize = 20;
    this.page = 1;
    this.cantRegistros = 0;
    this.totalRegistros = 0;
    }
}
