import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'admin-busqueda-avanzada-form',
  templateUrl: './busqueda-avanzada.component.html',
  styleUrls: ['./busqueda-avanzada.component.sass']
})
export class BusquedaAvanzadaComponent implements OnInit {
  @Input("listaLocalidades") public listaLocalidades: any;
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();
  public btnSeleccion: boolean = false;
  public mostrar: boolean = false;
  public busquedaAvanzada: FormGroup;
  /** Variables para los datePicker **/
  public hoveredDate: NgbDate; // Resalta la fecha
  public fromDate: NgbDate; // fecha desde
  public toDate: NgbDate; // fecha hasta
  public mostrarDp: boolean = false; // Muestra el DatePicker

  constructor(
    private _fb: FormBuilder,
    private _mensajeService: MensajesService,
    private _util: UtilService,
    private _calendar: NgbCalendar,
    private _configNgbDate: NgbDatepickerConfig
  ) {
    this.busquedaAvanzada = _fb.group({
      global_param: '',
      localidadid: '',
      fecha_ingreso_desde: '',
      fechaDesde: '',
      fecha_ingreso_hasta: '',
      fechaHasta: ''
    });
  }

  ngOnInit() {
  }
  /**
   * funcion que emite la devolucion de parametros al componente padre
   */
  public buscar() {
    // busqueda avanzada de los valores del formulario
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:any = {};
    let esTrue: boolean = false;
    // busco dentro del objeto segun la clave
    for (const clave in busquedaAvanzada) {
      if (clave !== 'fechaDesde' && clave !== 'fechaHasta'){
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
  /**
   * limpiador de los campos del formulario
   */
  public limpiarCampos(){
    let busqueda: any = this.busquedaAvanzada.value;
    for (const key in busqueda) {
      if (key == 'fechaDesde') {
        busqueda[key] = null;
      }else if (key == 'fechaHasta') {
        busqueda[key] = null;
      }else {
        busqueda[key] = '';
      }
    }
    this.busquedaAvanzada.patchValue(busqueda);
    this.buscar();
  }
  /**
   * muestra el fomulario de busqueda avanzada
   */
  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }
  /**
   * marca el campo que ha sido seleccionado
   * @param valor [any]
   * @return [boolean]
   */
  marcarCampo(valor: any){
    let marcar:boolean = false;
    marcar = (valor != null && valor != '') ? true : false;
    return marcar;
  }
  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatFecha(obj:any, keyFecha:string){
    if (obj != null){
      this.busquedaAvanzada.controls[keyFecha].patchValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
    }else{
      this.busquedaAvanzada.controls[keyFecha].patchValue('');
    }
  }
/* ### DATE PICKER CONFIG ### */
  /**
   * Selecciona el rango de fecha DESDE/HASTA
   * @param date [NgbDate] objeto de fecha del DatePicker
   */
  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({fechaDesde: date});
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.busquedaAvanzada.patchValue({fechaHasta: date});
      this.abrirDp();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({fechaDesde: date});
      this.busquedaAvanzada.patchValue({fechaHasta: null});
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
