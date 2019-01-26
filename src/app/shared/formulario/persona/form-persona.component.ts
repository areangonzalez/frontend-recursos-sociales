import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'shared-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.sass']
})
export class FormPersonaComponent implements OnInit {
  @Input('formPersona') public persona: FormGroup;
  @Input("documento") public setDocumento: string;

  public submitted: boolean = false;
  public sexoLista: any = [{id: 1, nombre: 'Hombre'}, {id: 2, nombre: 'Mujer'}];
  public generoLista: any = [{id: 1, nombre: 'Femenino'}, {id: 2, nombre: 'Masculino'}];
  public estadoCivilLista: any = [{id: 1, nombre: 'Casado'}, {id: 2, nombre: 'Soltero'}];
  public localidadLista: any = [{id: 1, nombre: 'Roca'}, {id: 2, nombre: 'Viedma'}];


  /**
   * @var cuil_medio [string] guarda el número que conforma el cuil
   */
  public cuil_medio:string = '';

  constructor(
    private _util: UtilService
  ){

  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get datosPersona() { return this.persona.controls; }

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

  /**
   * @function formatFechaNaciento convierte la fecha en un string
   * @param obj la fecha viene en formato objeto
   */
  public formatFechaNacimiento(obj:any){
    this.persona.controls.fecha_nacimiento.setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
  }

}
