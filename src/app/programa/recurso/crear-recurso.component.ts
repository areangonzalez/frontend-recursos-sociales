import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'programa-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.sass']
})
export class CrearRecursoComponent implements OnInit {
  public infoPersona = false;
  public datosPersona:any = {};
  public contactosForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ){
    this.contactosForm = _fb.group({
      contacto: _fb.group({
        telefono: '',
        celular: '',
        email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        red_social: ''
      })});
  }

  ngOnInit() {
  }

  public seleccionarPersona(datos){
    console.log(datos);
    if (datos.persona != undefined) {
      this.infoPersona = true;
      this.datosPersona = datos.persona;
      this.contactosForm.controls.contacto.patchValue(datos.persona);
    }
  }

  public cambiarPersona(){
    this.datosPersona = {};
    this.infoPersona = false;
  }


}
