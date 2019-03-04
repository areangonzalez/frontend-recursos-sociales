import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService, RecursoSocialService } from '../core/services';
import { UtilService } from '../core/utils';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.sass'],
  providers: [NgbTabsetConfig]
})
export class ReporteComponent implements OnInit {

  public busqueda: any = {page: 1, pagesize: 20};
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

    this.buscar(this.busqueda);
  }

  public buscar(apiBusqueda:any) {
    apiBusqueda["page"] = 1;
    apiBusqueda["pagesize"] = 20;
    this.busqueda = apiBusqueda;
    this.listarRecursos(apiBusqueda);
  }



  public listarRecursos(params:object){
    this._recursoService.buscar(params).subscribe(
      recursos => {
        this.configPaginacion.colleccionSize = recursos.total_filtrado;
        this.configPaginacion.pageSize = recursos.pagesize;
        this.recursosLista = recursos.resultado;
        console.log(recursos.resultado);
      },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public cambioPagina(page:any){
    console.log(page);
    this.busqueda["page"] = page;
    this.listarRecursos(this.busqueda);
  }
}

