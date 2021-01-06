import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalConfig, BotonDisenio } from './../../../core/models';

@Component({
  selector: 'admin-usuario-tabla',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})
export class UsuarioComponent implements OnInit {
  @Input("listado") public listado: any;
  @Input("configPaginacion") public configPaginacion: any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();

  /* Configuraciones para el modal de agregar y editar usuario */
  public configModalAgregar: ModalConfig = { title: "Agregar usuario" };
  public configBotonModalAgregar: BotonDisenio = { class: 'btn btn-sm btn-success btn-block', iconoClass: 'fas fa-user-plus', text:'Agregar Usuario' };
  public page = 1;

  constructor() { }

  ngOnInit() {
  }
  /**
   * Envio al componente padre el numero de pagina
   * @param pagina numero de pagina
   */
  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

}
