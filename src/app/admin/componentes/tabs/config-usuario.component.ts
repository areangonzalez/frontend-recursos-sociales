import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'admin-config-usuario-tabs',
  templateUrl: './config-usuario.component.html',
  styleUrls: ['./config-usuario.component.sass']
})
export class ConfigUsuarioComponent implements OnInit {
  @Input("configListas") configListas: any;
  @Input("datosUsuario") datosUsuario: any;
  public usuario: FormGroup;
  public submitted: boolean = false;

  constructor(private _fb: FormBuilder) {
    this.usuario = _fb.group({
        user_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        localidadid: '',
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPass: ['', [Validators.required]]
      }, { validators:  this.checkPasswords })
  }

  ngOnInit() {
    this.prepararFormulario(this.datosUsuario);
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
  public prepararFormulario(datos: object){
    this.usuario.patchValue(datos['usuario']);
  }

}
