import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'busqueda-modulo-alimentar',
  templateUrl: './busqueda-modulo-alimentar.component.html',
  styleUrls: ['./busqueda-modulo-alimentar.component.sass']
})
export class BusquedaModuloAlimentarComponent implements OnInit {
  @Input("localidades") public localidadesLista: any[];
  @Input("tipoResponsables") public tipoResponsablesLista: any[];
  @Input("delegaciones") public delegacionesLista: any[];
  @Input("municipios") public municipiosLista: any[];
  @Input("comisionesDeFomentos") public comisionesDeFomentosLista: any[];
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();

  public busquedaAvanzada: FormGroup;
  public globalParam:string = '';
  public mostrar: boolean = false;
  public btnSeleccion: boolean = false;

  public hoveredDate: NgbDate; // Resalta la fecha
  public fromDate: NgbDate; // fecha desde
  public toDate: NgbDate; // fecha hasta
  public mostrarDp: boolean = false; // Muestra el DatePicker

  /**
   * Carga los servicios y utilidades de angular que se aplicaran en el componente
   * @param _fb se utiliza para crear el formulario de la busqueda avanzada
   */
  constructor(
    private _fb: FormBuilder,
    private _calendar: NgbCalendar,
    private _configNgbDate: NgbDatepickerConfig,
    private _util: UtilService
  ){
    // configuracion de fecha minima
    _configNgbDate.minDate = {year: 1950, month: 1, day: 1};
    // formulario de busqueda avanzada
    this.busquedaAvanzada = _fb.group({
        persona: _fb.group({
          localidadid: '',
          direccion: '',
        }),
        global_param: '',
        localidadid: '',
        tipo_responsableid: '',
        delegacionid: '',
        municipioid: '',
        comision_fomentoid: '',
        fecha_alta_desde:'',
        fechaAltaDesde: null,
        fecha_alta_hasta:'',
        fechaAltaHasta: null
    });
  }

  ngOnInit() {}
  /**
   * Marca los campos que seran utilizados en la busqueda avanzada
   * @param valor contiene el valor del input seleccionado
   */
  marcarCampo(valor: any){
    let marcar:boolean = false;
    marcar = (valor != null && valor != '') ? true : false;
    return marcar;
  }
  /**
   * Crea los parametros de busqueda y los envia al componente padre.
   */
  public buscar() {
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let busquedaAvanzadaPersona = this.busquedaAvanzada.get('persona').value;
    let apiBusqueda:any = {};
    let personaBusqueda: any = {};
    let esTrue: boolean = false;
    //let apiBusqueda:object = {page:this.config page, pagesize:20};
    for (const clave in busquedaAvanzada) {
      if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave]) && clave !== 'persona'){
        Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
        esTrue = true;
      }
    }
    let contar = 0;
    // busco si hay datos en el objeto de persona dentro del formulario y lo agrego a la api
    for (const c in busquedaAvanzadaPersona) {
      if (busquedaAvanzadaPersona[c] !== '' && busquedaAvanzadaPersona[c] !== null && (busquedaAvanzadaPersona[c])) {
        Object.assign(personaBusqueda, {[c]: busquedaAvanzadaPersona[c]});
        esTrue = true;
        contar++;
      }
    }
    // solo agrego en api si tengo al menos 1 dato de persona
    if (contar > 0){
      apiBusqueda['persona'] = personaBusqueda;
    }
    console.log(apiBusqueda);
    this.obtenerBusqueda.emit(apiBusqueda);
    this.btnSeleccion = esTrue;
    this.mostrar = esTrue;
  }
  /**
   * Limpia los campos de busqueda y realiza la busqueda inicial
   */
  public limpiarCampos(){
    let busqueda: any = this.busquedaAvanzada.value;
    for (const key in busqueda) {
      if (key == 'persona'){
        for (const k in busqueda[key]) {
          busqueda[key][k] = '';
        }
      }else if (key == 'fechaAltaDesde') {
        busqueda[key] = null;
      }else if (key == 'fechaAltaHasta') {
        busqueda[key] = null;
      }else {
        busqueda[key] = '';
      }
    }
    this.busquedaAvanzada.get('persona').patchValue(busqueda['persona']);
    this.busquedaAvanzada.patchValue(busqueda);
    this.buscar();
  }
  /**
   * Muestra/Oculta los campos de busqueda avanzada
   */
  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }
  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatFecha(obj:any, keyFecha:string){
    if (obj != null){
      this.busquedaAvanzada.controls[keyFecha].setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
    }else{
      this.busquedaAvanzada.controls[keyFecha].setValue('');
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
