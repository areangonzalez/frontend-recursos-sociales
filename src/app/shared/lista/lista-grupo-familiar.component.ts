import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-lista-grupo-familiar',
  templateUrl: './lista-grupo-familiar.component.html',
  styleUrls: []
})
export class ListaGrupoFamiliarComponent implements OnInit {
  @Input("listadoGrupoFamiliar") public listadoGrupoFamiliar:any;

  constructor(){}

  ngOnInit() {
  }
  /**
   * agrego un nuevo persona al listado de grupo familiar
   * @param redSocial datos de una persona
   */
  public agregarMiembro(miembro:any) {
    this.listadoGrupoFamiliar.push(miembro);
  }
  /**
   * borro una persona del grupo familiar
   * @param id identificador que se posiciona en la tabla
   * @param confirmacion confirmacion del borrado
   */
  borrar(id:number, confirmacion: boolean){
    if (confirmacion){
      this.listadoGrupoFamiliar.splice(id, 1);
    }
  }
}
