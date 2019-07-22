import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { LocalidadService, MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'busqueda-beneficiario',
  templateUrl: './busqueda-beneficiario.component.html',
  styleUrls: ['./busqueda-beneficiario.component.sass']
})
export class BusquedaBeneficiarioComponent implements OnInit {
  @Input("localidades") public localidadesLista: any[];
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();

  public busquedaAvanzada: FormGroup;
  public globalParam:string = '';
  public mostrar: boolean = false;
  public btnSeleccion: boolean = false;
  /**
   * Carga los servicios y utilidades de angular que se aplicaran en el componente
   * @param _fb se utiliza para crear el formulario de la busqueda avanzada
   */
  constructor(
    private _fb: FormBuilder,
  ){
    this.busquedaAvanzada = _fb.group({
      global_param: '',
      localidadid: '',
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
    let apiBusqueda:any = {};
    let esTrue: boolean = false;
    //let apiBusqueda:object = {page:this.config page, pagesize:20};
    for (const clave in busquedaAvanzada) {
      if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
        Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
        esTrue = true;
      }
    }
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
  /**
   * Muestra/Oculta los campos de busqueda avanzada
   */
  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }

}
