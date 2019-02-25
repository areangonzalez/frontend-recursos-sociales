import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocalidadService, ProgramaService, TipoRecursoService, MensajesService, RecursoSocialService } from '../core/services';
import { UtilService } from '../core/utils';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.sass'],
  providers: [NgbTabsetConfig]
})
export class ReporteComponent implements OnInit {
  public recursosLista: any[] = [];
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1 };

  constructor(
    private _mensajeService: MensajesService,
    private _util: UtilService,
    private _recursoService: RecursoSocialService,
    private _configTabSet: NgbTabsetConfig
  ){
    _configTabSet.justify = 'center';
    _configTabSet.type = 'pills';
  }

  ngOnInit() {

    this.buscar(' ', 1);
  }

  public buscar(busqueda:string, page:number) {
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:object = {page:page, pagesize:20, global_param: busqueda};
    for (const clave in busquedaAvanzada) {
      if(busquedaAvanzada[clave] !== '') {
        apiBusqueda[clave] = busquedaAvanzada[clave];
      }
    }
    this.listarRecursos(apiBusqueda);
  }



  public listarRecursos(params:object){
    this._recursoService.buscar(params).subscribe(
      recursos => {
        this.configPaginacion.colleccionSize = recursos.total_filtrado;
        this.configPaginacion.pageSize = recursos.pagesize;
        this.recursosLista = recursos.resultado;
      },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public cambioPagina(page){
    //this.buscar(this.globalSearch, page);
    this.buscar(' ', page);
  }
}
