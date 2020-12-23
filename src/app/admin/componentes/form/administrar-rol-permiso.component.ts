import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'admin-administrar-rol-permiso-form',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.sass']
})
export class AdministrarRolPermisoComponent implements OnInit {
  @Input("listaPermisos") public listaPermisos: any;
  public rolPermisosForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.rolPermisosForm = _fb.group({
      rol: ["", [Validators.required]]
    })
  }

  ngOnInit() {
  }

}
