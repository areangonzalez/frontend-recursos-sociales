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
      permisos: [
        { nombre: "3_crear" },{ nombre: "3_ver" },{ nombre: "3_baja" },{ nombre: "3_acreditar" },
        { nombre: "5_crear" },{ nombre: "5_ver" },{ nombre: "5_baja" },{ nombre: "5_acreditar" },
        { nombre: "4_crear "},{ nombre: "4_ver "},{ nombre: "4_baja "},{ nombre: "4_acreditar "},
        { nombre: "2_crear "},{ nombre: "2_ver "},{ nombre: "2_baja "},{ nombre: "2_acreditar "},
        { nombre: "1_crear "},{ nombre: "1_ver "},{ nombre: "1_baja "},{ nombre: "1_acreditar "},
        { nombre: "6_crear "},{ nombre: "6_ver "},{ nombre: "6_baja "},{ nombre: "6_acreditar "}
      ]
    };
    this.abrirModal(usuario, listas);
  }



}
