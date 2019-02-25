import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public globalSearch:string = '';
  public mostrar:boolean = false;
  public busquedaAvanzada: FormGroup;
  public localidadesLista: any[] = [];
  public programasLista: any[] = [];
  public tipoRecursosLista: any[] =[];
  public recursosLista: any[] = [];
  public configPaginacion:any = { "colleccionSize": 0, "pageSize": 0, "page": 1 };

  constructor(
    private _fb: FormBuilder,
    private _localidadService: LocalidadService,
    private _programaService: ProgramaService,
    private _tipoRecursoService: TipoRecursoService,
    private _mensajeService: MensajesService,
    private _util: UtilService,
    private _recursoService: RecursoSocialService,
    private _configTabSet: NgbTabsetConfig
  ){
    _configTabSet.justify = 'center';
    _configTabSet.type = 'pills';
    // creacion de fomulario para busqueda avanzada
    this.busquedaAvanzada = _fb.group({
      localidadid: '',
      programaid: '',
      tipo_recursoid: '',
      fecha_desde: '',
      fechaDesde: '',
      fechaHasta: '',
      fecha_hasta: ''
    });
  }

  ngOnInit() {
    this.listarLocalidades();
    this.listarProgramas();
    this.listarTipoRecursos(5);
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

  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }

  public listarLocalidades(){
    this._localidadService.listar().subscribe(
      localidades => { this.localidadesLista = localidades; },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public listarProgramas(){
    this._programaService.listar().subscribe(
      programas => { this.programasLista = programas; },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public listarTipoRecursos(programaid:number){
    this._tipoRecursoService.buscarPorPrograma(programaid).subscribe(
      tipoRecursos => { this.tipoRecursosLista = tipoRecursos; },
      error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public formatFechaDesde(obj:any){
    this.busquedaAvanzada.controls.fecha_desde.setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
  }

  public formatFechaHasta(obj:any){
    this.busquedaAvanzada.controls.fecha_hasta.setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
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
    this.buscar(this.globalSearch, page);
  }
}
