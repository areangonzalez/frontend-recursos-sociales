import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-usuario-pass-form',
  templateUrl: './usuario-pass-form.component.html',
  styleUrls: ['./usuario-pass-form.component.sass']
})
export class UsuarioPassFormComponent implements OnInit {
  @Input("usuario") public usuario: FormGroup;
  @Input("submitted") public submitted: boolean;

  constructor() { }

  ngOnInit() {}


}
