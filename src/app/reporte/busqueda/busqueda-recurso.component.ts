import { Component, OnInit, Input } from '@angular/core';
import { LocalidadService, ProgramaService, TipoRecursoService, MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'busqueda-beneficiario',
  templateUrl: './busqueda-beneficiario.component.html',
  styleUrls: ['./busqueda-beneficiario.component.sass']
})
export class BusquedaRecursoComponent implements OnInit {
  @Input("busquedaAvanzada") public busquedaAvanzada: FormGroup;

  public localidadesLista: any[] = [];
  public programasLista: any[] = [];
  public tipoRecursosLista: any[] =[];
  public globalSearch:string = '';
  public mostrar: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _localidadService: LocalidadService,
    private _programaService: ProgramaService,
    private _tipoRecursoService: TipoRecursoService,
    private _mensajeService: MensajesService,
    private _util: UtilService
  ){

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

  public buscar(busqueda:string, page:number) {
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:object = {page:page, pagesize:20, global_param: busqueda};
    for (const clave in busquedaAvanzada) {
      if(busquedaAvanzada[clave] !== '') {
        apiBusqueda[clave] = busquedaAvanzada[clave];
      }
    }
    //this.listarRecursos(apiBusqueda);
  }

  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }

}
