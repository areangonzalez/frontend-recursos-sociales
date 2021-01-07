import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalConfig, BotonDisenio } from './../../../core/models';
import { UsuarioService, MensajesService } from './../../../core/services';

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

  constructor(private _usuarioService: UsuarioService, private _msj: MensajesService) { }

  ngOnInit() {
  }
  /**
   * Envio al componente padre el numero de pagina
   * @param pagina numero de pagina
   */
  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }


  darBajaUsuario(baja:any, usuarioid: number) {
    baja['usuarioid'] = usuarioid;
    if (baja.confirmacion) {
      this._usuarioService.baja(baja).subscribe(
        resultado => {
          this._msj.exitoso("El usuario a sido dado de baja correctamente.", [{name:""}]);
          this.cambioPagina(this.configPaginacion.page);
        }, error => { this._msj.cancelado(error, [{name:''}]); })
    }

  }
}
