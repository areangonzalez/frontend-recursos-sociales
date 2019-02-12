import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UtilService } from 'src/app/core/utils';
import { SexoService, GeneroService, EstadoCivilService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'shared-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.sass']
})
export class FormPersonaComponent implements OnInit {
  @Output('getDatos') public getDatos = new EventEmitter();

  public formPersona: FormGroup;
  public submitted: boolean = false;
  public sexoLista: any = [];
  public generoLista: any = [];
  public estadoCivilLista: any = [];

  public setDocumento: string = '';

  /**
   * @var cuil_medio [string] guarda el número que conforma el cuil
   */
  public cuil_medio:string = '';

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _util: UtilService,
    private _mensajeService: MensajesService,
    private _sexoService: SexoService,
    private _generoService: GeneroService,
    private _estadoCivilService: EstadoCivilService
  ){
    this.formPersona = _fb.group({
        id: 0,
        nro_documento: ['', [Validators.required, Validators.minLength(7)]],
        apellido: ['', [Validators.required, Validators.minLength(3)]],
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        cuil: '',
        cuil_prin: ['', [Validators.required, Validators.minLength(2)]],
        cuil_fin: ['', [Validators.required, Validators.minLength(2)]],
        fecha_nacimiento: '',
        fechaNacimiento: ['', Validators.required],
        sexoid: ['', Validators.required],
        generoid: ['', Validators.required],
        estado_civilid: ['', Validators.required],
        contacto: _fb.group({
          telefono: '',
          celular: '',
          email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
          red_social: ''
        }),
        lugar: _fb.group({
          id: 0,
          localidadid: ['', Validators.required],
          calle: ['', [Validators.required, Validators.minLength(3)]],
          altura: ['', Validators.required],
          barrio: '',
          piso: '',
          depto: '',
          escalera: ''
        })
    });
  }

  ngOnInit() {
    this.listarSexo();
    this.listarGenero();
    this.listarEstadoCivil();
  }

  // convenience getter for easy access to form fields
  get datosPersona() { return this.formPersona.controls; }

  /**
   * @function soloNumero valida que los datos ingresados en un input sean solo numeros.
   * @param datos objeto que contiene los datos de un input.
   */
  public soloNumero(datos:any){
    if (!this._util.validarNumero(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }
  /**
   * @function validarCuil valida el numero de cuil que esta en el medio
   * @param nroDocumento número de documento para ser validado.
   */
  public validarCuil(nroDocumento:string) {
    if (nroDocumento.length == 7) {
      this.cuil_medio = '0' + nroDocumento;
    }else{
      this.cuil_medio = nroDocumento;
    }
    return this.cuil_medio;
  }
  /**
   * @function validarPersonaPorNroDocumento obtiene la validacion de una persona mediante su número de documento
   * @param nroDocumento valor que sirve para la validación de una persona.
   */
  public validarPersonaPorNroDocumento(nroDocumento:string){
    // aplicar servicio
    return true;
  }
  /**
   * @function armarCuil funcion que arma el cuil uniendo las variables de los formularios
   */
  public armarCuil(){
    const cuil_primero = this.formPersona.value.cuil_prin;
    const cuil_ult = this.formPersona.value.cuil_fin;
    // verifico si las variables son distintas a vacio
    // si la validacion es correcta seteo el valor del formulario con el cuil armado
    if (cuil_primero != '' && cuil_ult != '') {
        return this.formPersona.controls.cuil.setValue(cuil_primero + this.cuil_medio + cuil_ult);
    }else{ // si esta vacio seteo el valor del formulario en vacion
        return this.formPersona.controls.cuil.setValue('');
    }
  }

  /**
   * @function formatFechaNaciento convierte la fecha en un string
   * @param obj la fecha viene en formato objeto
   */
  public formatFechaNacimiento(obj:any){
    this.formPersona.controls.fecha_nacimiento.setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
  }

  public obtenerDatos(){
    //desarrollar submit
    this.getDatos.emit(this.formPersona.value);
  }

  /* Funcionalidad para los listados */

  public listarSexo(){
    this._sexoService.listar().subscribe(
      datos => {
        this.sexoLista = datos;
      }, error => {
        this._mensajeService.cancelado(error, [{name:''}]);
      });
  }

  public listarGenero(){
    this._generoService.listar().subscribe(
      datos => {
        this.generoLista = datos;
      }, error => {
        this._mensajeService.cancelado(error, [{name:''}]);
      });
  }

  public listarEstadoCivil(){
    this._estadoCivilService.listar().subscribe(
      datos => {
        this.estadoCivilLista = datos;
      }, error => {
        this._mensajeService.cancelado(error, [{name:''}]);
      });
  }

  public guardar() {
    this.submitted = true;
    if (this.formPersona.invalid) {
      this._mensajeService.cancelado("Campos sin completar!!", [{name:''}]);
      return;
    }
  }

}
