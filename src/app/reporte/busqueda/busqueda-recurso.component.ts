import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocalidadService, ProgramaService, TipoRecursoService, MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isEmpty } from 'rxjs/operators';
import { debug } from 'util';

@Component({
  selector: 'busqueda-recurso',
  templateUrl: './busqueda-recurso.component.html',
  styleUrls: ['./busqueda-recurso.component.sass']
})
export class BusquedaRecursoComponent implements OnInit {
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();

  public busquedaAvanzada: FormGroup;
  public localidadesLista: any[] = [];
  public programasLista: any[] = [];
  public tipoRecursosLista: any[] =[];
  public globalParam:string = '';
  public mostrar: boolean = false;
  public btnSeleccion: boolean = false;

  public hoveredDate: NgbDate;
  public fromDate: NgbDate;
  public toDate: NgbDate;
  public mostrarDp: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _localidadService: LocalidadService,
    private _programaService: ProgramaService,
    private _tipoRecursoService: TipoRecursoService,
    private _mensajeService: MensajesService,
    private _util: UtilService,
    private _calendar: NgbCalendar,
    private _configNgbDate: NgbDatepickerConfig
  ){
    // configuracion de fecha minima
    _configNgbDate.minDate = {year: 1950, month: 1, day: 1};
    // creacion de fomulario para busqueda avanzada
    this.busquedaAvanzada = _fb.group({
      global_param: '',
      localidadid: '',
      programaid: '',
      tipo_recursoid: '',
      fecha_alta_desde: '',
      fechaAltaDesde: null,
      fecha_alta_hasta: '',
      fechaAltaHasta: null,
      estado: '',
  });
  }

  ngOnInit() {
    this.listarLocalidades();
    this.listarProgramas();
    this.listarTipoRecursos(5);
  }

  marcarCampo(valor: any){
    let marcar:boolean = false;
    marcar = (valor != null && valor != '') ? true : false;
    return marcar;
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

  public formatFecha(obj:any, keyFecha:string){
    if (obj != null){
      this.busquedaAvanzada.controls[keyFecha].setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
    }else{
      this.busquedaAvanzada.controls[keyFecha].setValue('');
    }
  }

  public buscar() {
    // busqueda avanzada de los valores del formulario
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:any = {};
    let esTrue: boolean = false;
    // busco dentro del objeto segun la clave
    for (const clave in busquedaAvanzada) {
      if (clave !== 'fechaAltaDesde' && clave !== 'fechaAltaHasta'){
        if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
          Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
          esTrue = true;
        }
      }
    }
    this.obtenerBusqueda.emit(apiBusqueda);
    this.btnSeleccion = esTrue;
    this.mostrar = esTrue;
  }

  public limpiarCampos(){
    let busqueda: any = this.busquedaAvanzada.value;
    for (const key in busqueda) {
      if (key == 'fechaAltaDesde') {
        busqueda[key] = null;
      }else if (key == 'fechaAltaHasta') {
        busqueda[key] = null;
      }else {
        busqueda[key] = '';
      }
    }
    this.busquedaAvanzada.patchValue(busqueda);
    this.buscar();
  }

  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }

  /* ### DATE PICKER CONFIG ### */

  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({fechaAltaDesde: date});
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.busquedaAvanzada.patchValue({fechaAltaHasta: date});
      this.abrirDp();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({fechaAltaDesde: date});
      this.busquedaAvanzada.patchValue({fechaAltaHasta: null});
    }
  }

  public isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  public isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  public abrirDp(){
    this.mostrarDp = !this.mostrarDp;
  }

}
