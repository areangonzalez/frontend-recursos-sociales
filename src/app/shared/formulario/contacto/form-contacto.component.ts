import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'shared-form-contacto',
  templateUrl: './form-contacto.component.html',
  styleUrls: ['./form-contacto.component.sass']
})
export class FormContactoComponent implements OnInit {
  @Input("formContacto") public contacto: FormGroup;
  @Input("listaRedSocial") public listaRedSocial: any;

  public submitted: boolean = false;

  constructor(){}

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get datosContacto() { return this.contacto.controls; }

  public aMinuscula(palabra:any){
    palabra.value = palabra.value.toLowerCase();
  }
}
