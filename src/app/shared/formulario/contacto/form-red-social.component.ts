import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'shared-form-red-social',
  templateUrl: './form-red-social.component.html'
  //styleUrls: ['./form-contacto.component.sass']
})
export class FormRedSocialComponent implements OnInit {
  //@Input("formContacto") public contacto: FormGroup;

  constructor(){}

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  //get datosRedSocial() { return this.contacto.controls; }

}
