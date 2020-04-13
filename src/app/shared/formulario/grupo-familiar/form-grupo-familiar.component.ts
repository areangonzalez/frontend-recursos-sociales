import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-form-grupo-familiar',
  templateUrl: './form-grupo-familiar.component.html'
})
export class FormGrupoFamiliarComponent implements OnInit {
  @Input("formGrupoFamiliar") public grupoFamiliar: FormGroup;

  constructor(){}

  ngOnInit() {
  }

}
