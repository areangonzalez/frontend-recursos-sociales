import { Component, Input, OnInit } from '@angular/core';
import { MensajesService, SoporteService } from '../../../core/services';

@Component({
  selector: 'admin-programa-permiso-tabla',
  templateUrl: './programa-permiso.component.html',
  styleUrls: ['./programa-permiso.component.sass']
})
export class ProgramaPermisoComponent implements OnInit {
  @Input("listaProgramaPermisos") public listaProgramaPermisos: any;

  constructor(private _msj: MensajesService, private _soporteService: SoporteService) { }

  ngOnInit() {
  }

  borrarDato(idUsuario: number, programaid: number, confirmacion: boolean) {
    if (confirmacion) {
      this._soporteService.borrarAsignacion(idUsuario, programaid).subscribe(
        repsuesta => {
          this._msj.exitoso("Se ha borrado el programa con sus permisos.", [{name: ''}]);
          this.actualizarListado(idUsuario);
        }, error => { this._msj.cancelado(error, [{name: ""}]); }
      );
    }
  }
  /**
   * Actuliza el listado de los permisos por programa
   * @param idUsuario identificador del usuario que sirve para obtener el listado del mismo
   */
  actualizarListado(idUsuario: number) {
    this._soporteService.listarAsignacion(idUsuario).subscribe(
      listado => { this.listaProgramaPermisos = listado; },
      error => { this._msj.cancelado(error, [{name: ""}]); }
    )
  }
}
