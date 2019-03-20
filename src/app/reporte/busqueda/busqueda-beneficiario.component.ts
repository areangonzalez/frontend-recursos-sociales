import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { LocalidadService, MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'busqueda-beneficiario',
  templateUrl: './busqueda-beneficiario.component.html',
  styleUrls: ['./busqueda-beneficiario.component.sass']
})
export class BusquedaBeneficiarioComponent implements OnInit {
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();

  public busquedaAvanzada: FormGroup;
  public localidadesLista: any[] = [];
  public globalParam:string = '';
  public mostrar: boolean = false;
  public btnSeleccion: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _localidadService: LocalidadService,
    private _mensajeService: MensajesService,
    private _util: UtilService,
  ){
    this.busquedaAvanzada = _fb.group({
      global_param: '',
      localidadid: '',
    });
  }

  ngOnInit() {
    this.listarLocalidades();
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

  public buscar() {
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:any = {};
    let esTrue: boolean = false;
    //let apiBusqueda:object = {page:this.config page, pagesize:20};
    for (const clave in busquedaAvanzada) {
      if (busquedaAvanzada[clave] != '') {
        if(clave === "global_param") {
          apiBusqueda[clave] = busquedaAvanzada[clave];
        }else{
          apiBusqueda[clave] = busquedaAvanzada[clave];
          esTrue = true;
        }
      }
    }
    console.log()
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
}
