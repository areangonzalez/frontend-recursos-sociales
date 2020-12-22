import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configurar-usuario-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Configurar Datos del Usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="_activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <admin-config-usuario-tabs></admin-config-usuario-tabs>
    </div>
  `,
  styleUrls: ['./configurar-usuario-modal.component.sass']
})
export class ConfigurarUsuarioModalContent {

  constructor(public _activeModal: NgbActiveModal) { }

  cancelarModal(cancelar: boolean) {
    this._activeModal.close("closed");
  }


}
@Component({
  selector: 'admin-configurar-usuario-modal',
  templateUrl: './configurar-usuario-modal.component.html'
})
export class ConfigurarUsuarioModalComponent {
  @Input("usuarioid") public usuarioid: number;
  constructor(private _modalService: NgbModal){}

  abrirModal(datosUsuario: any, listas: any) {
    const modalRef = this._modalService.open(ConfigurarUsuarioModalContent, { size: "lg" });
    modalRef.componentInstance.listas = listas;
    modalRef.componentInstance.datosUsuario = datosUsuario;
  }

  configurarModal() {
    let usuario = {
      id: this.usuarioid, nro_documento: '25262728', apellido: 'Garcia', nombre: 'Pedro',
      cuil: '25262728', cuil_prin: '20', cuil_fin: '3',
      usuario: {
        user_name: 'pgarcia',
        email: 'pgarcia@desarrollohumano.rionegro.gov.ar',
        password: '',
      }};

    let listas: any = {
      roles: [{ id: 1, nombre: 'admin' }, { id: 2, nombre: 'soporte' }, { id: 3, nombre: 'usuario_general' }, { id: 4, nombre: 'usuario_emprender' },
      { id: 5, nombre: 'usuario_habirat' }, { id: 6, nombre: 'usuario_micro_emprendimiento' }, { id: 7, nombre: 'usuario_modulo_alimenticio' },
      { id: 8, nombre: 'usuario_rio_negro_presente' }, { id: 9, nombre: 'usuario_subsidio' }],
      permisos: [{id: 1, nombre: "prestacion_crear" },{id: 2, nombre: "prestacion_modificar" },{id: 3, nombre: "prestacion_baja" },{id: 4, nombre: "prestacion_acreditar" },
      {id: 5, nombre: "prestacion_ver" },{id: 6, nombre: "persona_crear" },{id: 7, nombre: "persona_baja" },{id: 8, nombre: "persona_modificar" },
      {id: 9, nombre: "persona_ver" }]
    }


    this.abrirModal(usuario, listas);
  }



}
