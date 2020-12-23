import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrar-rol-permiso',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.sass']
})
export class AdministrarRolPermisoComponent implements OnInit {
  public rolPermisosForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.rolPermisosForm = _fb.group({
      rol: ["", [Validators.required]]
    })
  }

  ngOnInit() {
  }

}
