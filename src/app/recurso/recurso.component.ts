import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.sass']
})
export class RecursoComponent implements OnInit {
  public infoPersona:boolean = false;
  public datosPersona:any = {};
  public contactosForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
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
    if (datos.persona != undefined) {
      this.infoPersona = true;
      this.datosPersona = datos.persona;
      this.contactosForm.controls.contacto.patchValue(datos.persona);
    }
  }

  public cambiarPersona(){
    this.datosPersona = {};
    this.infoPersona = false;
    this.contactosForm.reset();
  }

  public editarPersona(){
    console.log("Hacer algo");
  }
}
