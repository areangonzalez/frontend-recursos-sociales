import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { LocalidadService, ProgramaService, TipoRecursoService, MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isEmpty } from 'rxjs/operators';

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
    private _calendar: NgbCalendar
  ){
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
      acreditacion: false,
      baja: false
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

  public formatFecha(obj:any, keyFecha:string){
    if (obj != null){
      this.busquedaAvanzada.controls[keyFecha].setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
    }else{
      this.busquedaAvanzada.controls[keyFecha].setValue('');
    }
  }

  public buscar() {
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:any = {};
    //let apiBusqueda:object = {page:this.config page, pagesize:20};
    for (const clave in busquedaAvanzada) {
      if (clave == 'fechaAltaDesde' || clave == 'fechaAltaHasta'){
      }else if(busquedaAvanzada[clave] !== '') {
        apiBusqueda[clave] = busquedaAvanzada[clave];
      }
    }
    this.obtenerBusqueda.emit(apiBusqueda);
    //this.listarRecursos(apiBusqueda);
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
