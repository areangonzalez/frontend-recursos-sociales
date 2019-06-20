import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'shared-form-red-social',
  templateUrl: './form-red-social.component.html',
  styleUrls: ['./form-red-social.component.sass']
})
export class FormRedSocialComponent implements OnInit {
  @Input("formRedSocial") public redSocial: FormGroup;
  @Input("listadoTipoRedSocial") public tipoRedSocialLista: any;

  constructor(){}

  ngOnInit() {}

}
