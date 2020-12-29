import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'admin-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.sass']
})
export class UsuarioFormComponent implements OnInit {
  @Input("datosUsuario") public datosUsuario: any;
  @Output("cancelarForm") public cancelarForm = new EventEmitter();
  public persona: FormGroup;
  public cuil_medio: string;
  public submitted: boolean = false;
  public editarUsuario: boolean = true;

  constructor(private _fb: FormBuilder, private _util: UtilService, private _mensajeService: MensajesService) {
    this.persona = _fb.group({
      id: '',
      nro_documento: ['', [Validators.required, Validators.minLength(7)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cuil: '',
      cuil_prin: ['', [Validators.required, Validators.minLength(2)]],
      cuil_fin: ['', [Validators.required, Validators.minLength(1)]],
      usuario: _fb.group({
        user_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        localidadid: '',
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPass: ['', [Validators.required]]
      }, { validators:  this.checkPasswords })
    });
  }

  ngOnInit() {
    if (this.datosUsuario !== null) {
      this.completarForm(this.datosUsuario);
      this.persona.removeControl("usuario");
      this.editarUsuario = true;
    } else {
      this.editarUsuario = false;
    }
  }

  completarForm(datos: any) {
    this.validarCuil(datos["nro_documento"]);
    this.persona.patchValue(datos);
  }

  cancelar() {
    this.cancelarForm.emit(true);
  }

  validarPersona() {
    this.submitted = true;
    if (this.persona.invalid) { // verifico la validación en los campos del formulario
      console.log("no se valida");
      /* if (this.persona.get('email').value !== this.persona.get('email').value.toLowerCase()){
        this._mensajeService.cancelado("El email no puede estar en mayusculas!!", [{name:''}]);
      }else{ */
        this._mensajeService.cancelado("Campos sin completar!!", [{name:''}]);
      // }
      return;
    }else{ // si pasa la validación
      console.log("paso la validación");
      this._mensajeService.exitoso("Se guardo el usuario con exito. Se necesita seguir desarrollando esta respueta.", [{name:''}]);
      this.cancelarForm.emit(true);
      /*
      let id = this.persona.value.id;
      let usuario = this.persona.value);
      this.guardarUsuario(usuario,id); */
    }
  }

  /**
   * Checkea la comparacion de las contraseñas para validar
   * @param group formulario que contiene los valores a comparar
   */
  checkPasswords(group: AbstractControl): { invalid: boolean } { // here we have the 'passwords' group
    if ( group.get('password').value !== group.get('confirmPass').value ) {
      return { invalid: true };
    }
  }

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
    //return this.cuil_medio;
  }
  /**
   * @function armarCuil funcion que arma el cuil uniendo las variables de los formularios
   */
  public armarCuil(){
    const cuil_primero = this.persona.value.cuil_prin;
    const cuil_ult = this.persona.value.cuil_fin;
    // verifico si las variables son distintas a vacio
    // si la validacion es correcta seteo el valor del formulario con el cuil armado
    if (cuil_primero != '' && cuil_ult != '') {
        return this.persona.controls.cuil.setValue(cuil_primero + this.cuil_medio + cuil_ult);
    }else{ // si esta vacio seteo el valor del formulario en vacion
        return this.persona.controls.cuil.setValue('');
    }
  }

}
