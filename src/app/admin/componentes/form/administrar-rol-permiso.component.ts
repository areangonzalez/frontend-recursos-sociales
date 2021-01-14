import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MensajesService, SoporteService } from '../../../core/services';

@Component({
  selector: 'admin-administrar-rol-permiso-form',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.sass']
})
export class AdministrarRolPermisoComponent implements OnInit {
  @Input("idUsuario") private idUsuario: number;
  @Input("listaProgramas") public listaProgramas: any;
  @Input("listaPermisos") public listaPermisos: any;
  @Input("baja") public baja: boolean;
  public submitted: boolean = false;
  public permisosForm: FormGroup;
  public listaProgramaPermisos: any = [];
  public permisosSeleccionados: any = [];

  constructor(private _fb: FormBuilder, private _msj: MensajesService, private _soporteService: SoporteService) {
    this.permisosForm = _fb.group({
      programaid: ["", [Validators.required]]
    });

  }

  ngOnInit() {
    this.obtenerListaProgramaPermisos(this.idUsuario);
  }

  obtenerListaProgramaPermisos(idUsuario: number) {
    this._soporteService.listarAsignacion(idUsuario).subscribe(
      listado => {
        this.listaProgramaPermisos = listado;
      }, error => { this._msj.cancelado(error, [{name:""}]); }
    )
  }

  setPermisosDefault(programaid: any) {
    this.permisosSeleccionados = (programaid != "") ? [{ name: "prestacion_ver" }] : [];
  }

  validarDatos() {
    this.submitted = true;
    if (this.permisosForm.invalid && (this.permisosSeleccionados.length !== 0)) {
      return;
    }else{
      let params: any = this.permisosForm.value;
      params["usuarioid"] = this.idUsuario;
      params["lista_permiso"] = this.permisosSeleccionados;

      this.guardar(params)
    }
  }

  guardar(params: object) {
    this._soporteService.asignarPermisos(params).subscribe(
      respuesta => {
        this._msj.exitoso("Se han agregado correctamente el programa y los permisos al usuario.", [{name:""}]);
        this.obtenerListaProgramaPermisos(this.idUsuario);
      }, error => { this._msj.cancelado(error, [{name: ""}]); }
    );
  }
}
