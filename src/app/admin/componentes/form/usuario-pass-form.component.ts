import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-usuario-pass-form',
  templateUrl: './usuario-pass-form.component.html',
  styleUrls: ['./usuario-pass-form.component.sass']
})
export class UsuarioPassFormComponent implements OnInit {
  @Input("localidades") public localidades: any;
  @Input("usuario") public usuario: FormGroup;
  @Input("submitted") public submitted: boolean;

  constructor() { }

  ngOnInit() {}
  /**
   * convierte el email a minuscula, si el usuario esta escribiendo en mayuscula
   * @param palabra {string} texto que esta siendo tipeado
   */
  public aMinuscula(palabra:any){
    palabra.value = palabra.value.toLowerCase();
  }
}
