import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-programa-permiso-tabla',
  templateUrl: './programa-permiso.component.html',
  styleUrls: ['./programa-permiso.component.sass']
})
export class ProgramaPermisoComponent implements OnInit {
  @Input("listaProgramaPermisos") public listaProgramaPermisos: any;

  constructor() { }

  ngOnInit() {
  }

  borrarDato(numFila:number, confirmacion: boolean) {
    /* if (confirmacion){
      this.listaProgramaPermisos.splice(numFila, 1);
    } */
  }
  /**
   * Actuliza el listado de los permisos por programa
   * @param idUsuario identificador del usuario que sirve para obtener el listado del mismo
   */
  actualizarListado(idUsuario: number) {
    // pedir listado a backend
  }
}
