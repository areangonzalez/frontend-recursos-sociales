import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'shared-form-contacto',
  templateUrl: './form-contacto.component.html',
  styleUrls: ['./form-contacto.component.sass']
})
export class FormContactoComponent implements OnInit {
  @Input("formContacto") public contacto: FormGroup;

  public submitted: boolean = false;
  public localidadLista: any = [{id: 1, nombre: 'Roca'}, {id: 2, nombre: 'Viedma'}];

  constructor(){}

  ngOnInit() {
    console.log(this.contacto);
  }

  // convenience getter for easy access to form fields
  get datosContacto() { return this.contacto.controls; }

}
