import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'admin-administrar-rol-permiso-form',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.sass']
})
export class AdministrarRolPermisoComponent implements OnInit {
  @Input("listaProgramas") public listaProgramas: any;
  @Input("listaPermisos") public listaPermisos: any;
  public rolPermisosForm: FormGroup;
  public programsSeleccionados: any = [];
  public permisosSeleccionados: any = [];

  constructor(private _fb: FormBuilder) {
    this.rolPermisosForm = _fb.group({
      rol: ["", [Validators.required]]
    })
  }

  ngOnInit() {
  }

}
