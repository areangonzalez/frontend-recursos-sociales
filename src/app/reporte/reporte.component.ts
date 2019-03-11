import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService, RecursoSocialService, LoaderService } from '../core/services';
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
    private _configTabSet: NgbTabsetConfig,
    private _loaderService: LoaderService
  ){
    _configTabSet.justify = 'center';
    _configTabSet.type = 'pills';
  }

  ngOnInit() {

    this.buscar(this.busqueda);
  }

  public buscar(apiBusqueda:any) {
    apiBusqueda["page"] = 0;
    apiBusqueda["pagesize"] = 20;
    this.busqueda = apiBusqueda;
    this.listarRecursos(apiBusqueda);
  }



  public listarRecursos(params:object){
    this._recursoService.buscar(params).subscribe(
      recursos => {
        this.configPaginacion.colleccionSize = recursos.total_filtrado;
        this.configPaginacion.pageSize = recursos.pagesize;
        this.configPaginacion.monto_total = recursos.monto_total;
        // calculo los rangos por pagina.
        if ( this.configPaginacion.page == 1 ) {
          this.configPaginacion.cantRegistros = 1;
          this.configPaginacion.totalRegistros = recursos.pagesize;
        }else {
          // sumo la cantidad de registros anterior mas la longitud de la pagina
          this.configPaginacion.cantRegistros = this.configPaginacion.cantRegistros + recursos.pagesize;
          if ( recursos.resultado.length > recursos.pagesize) {
            // duplico la longitud de lapagina
            this.configPaginacion.totalRegistros = (recursos.pagesize * 2);
          }else{
            // pongo el total general de la coleccion
            this.configPaginacion.totalRegistros = recursos.colleccionSize;
          }
        }


        this.recursosLista = recursos.resultado;
      },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public cambioPagina(page:any){
    this.busqueda["page"] = page - 1;
    this.listarRecursos(this.busqueda);
  }
}

