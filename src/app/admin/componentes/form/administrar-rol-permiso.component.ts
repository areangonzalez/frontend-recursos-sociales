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
  public listaProgramaPermisos: any = [];
  public permisosSeleccionados: any = [];

  constructor(private _fb: FormBuilder) {
    this.rolPermisosForm = _fb.group({
      rol: ["", [Validators.required]],
      programaid: ["", [Validators.required]]
    })
  }

  ngOnInit() {
  }

  obtenerListaProgramaPermisos(idUsuario: number) {
    // Se genera el servicio para obtener el listado de permisos por programa del usuario
  }

}
