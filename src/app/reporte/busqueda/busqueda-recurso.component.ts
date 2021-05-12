import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { TipoRecursoService, MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'busqueda-recurso',
  templateUrl: './busqueda-recurso.component.html',
  styleUrls: ['./busqueda-recurso.component.sass']
})
export class BusquedaRecursoComponent implements OnInit {
  @Input("localidades") public localidadesLista: any[]; // listado de localidades
  @Input("programas") public programasLista: any[]; // listado de programas
  @Input("tipoPrestacion") public tipoRecursosLista: any[]; // listado de tipo prestacion
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter(); // funcion que devuele los parametros de busqueda
  @Output("exportarAExcel") public exportarAExcel = new EventEmitter();

  public busquedaAvanzada: FormGroup; // Formulario de busqueda avanzada
  public globalParam:string = ''; // se usa para la busqueda general (input)
  public mostrar: boolean = false; // muestra/oculta el componente de busqueda avanzada
  public btnSeleccion: boolean = false; // muestra el marco de los campos seleccionados

  public btnExportar: boolean = false;

  public hoveredDate: NgbDate; // Resalta la fecha
  public fromDate: NgbDate; // fecha desde
  public toDate: NgbDate; // fecha hasta
  public mostrarDp: boolean = false; // Muestra el DatePicker
  public tipoRecursosListaAux: any[]; // lista auxiliar para el combo de tipo recursos
  public meses: any = [];

  /**
   * @param _fb [FormBuilder] Arma el formulario de busqueda avanzada
   * @param _tipoRecursoService [Service] Servicio para el listado de Tipo prestaciones
   * @param _mensajeService [Service] Servicio que muestras los mensajes de errores
   * @param _util [Service] servicio para utilidades generales
   * @param _calendar Calendario para el DatePicker
   * @param _configNgbDate [Config] configuracion para el DatePicker
   */
  constructor(
    private _fb: FormBuilder,
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
      mes: ''
  });
  }

  ngOnInit() {
    this.tipoRecursosListaAux = this.tipoRecursosLista;
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
   * Listado para el tipo de prestaciones segun su programa
   * @param programaid identificador del programa
   */
  public listarTipoRecursos(programaid:any){
    if (programaid != ""){
      for (let i = 0; i < this.programasLista.length; i++) {
        if (parseInt(programaid) == this.programasLista[i].id){
          this.tipoRecursosLista = this.programasLista[i].lista_tipo_recurso;
        }
      }
    }else{
      this.tipoRecursosLista = this.tipoRecursosListaAux;
    }
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
      if (clave !== 'fechaAltaDesde' && clave !== 'fechaAltaHasta'){
        if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
          Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
          esTrue = true;
        }
      }
    }
    this.obtenerBusqueda.emit(apiBusqueda);
    this.btnExportar = esTrue;
    this.btnSeleccion = esTrue;
    this.mostrar = esTrue;
  }
  /**
   * limpiador de los campos del formulario
   */
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
    this.listarTipoRecursos('');
  }

  public listarMeses(){
    this.meses = [];
    if (this.busquedaAvanzada.get("estado").value != '' && this.busquedaAvanzada.get("estado").value != 'sin-acreditar') {
      this.meses = [
        { mes:1, nombre: "Enero"}, { mes:2, nombre: "Febrero"}, { mes:3, nombre: "Marzo"}, { mes:4, nombre: "Abril"},
        { mes:5, nombre: "Mayo"}, { mes:6, nombre: "Junio"}, { mes:7, nombre: "Julio"}, { mes:8, nombre: "Agosto"},
        { mes:9, nombre: "Septiembre"}, { mes:10, nombre: "Octubre"}, { mes:11, nombre: "Noviembre"}, { mes:12, nombre: "Diciembre"}
      ]
    }
  }
  /**
   * muestra el fomulario de busqueda avanzada
   */
  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }

  /**
   * Funcion que indica la exportacion a excel
   */
  public exportarExcel(confirmar){
    this.exportarAExcel.emit(confirmar);
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
