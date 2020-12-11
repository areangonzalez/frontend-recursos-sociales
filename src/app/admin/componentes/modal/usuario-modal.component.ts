import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotonDisenio, ModalConfig } from 'src/app/core/models';
import { PersonaService } from 'src/app/core/services';

@Component({
  selector: 'admin-usuario-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{configModal.title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <admin-usuario-form [datosUsuario]="datosUsuario" (cancelarForm)="cancelarModal($event)"></admin-usuario-form>
    </div>
  `
})
export class UsuarioModalContent {
  @Input("configModal") public configModal:ModalConfig;
  @Input("datosUsuario") public datosUsuario:any;
  constructor(public activeModal: NgbActiveModal) {}

  cancelarModal(cancelar: boolean) {
    this.activeModal.close('closed');
  }
}

@Component({
  selector: 'admin-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.sass']
})
export class UsuarioModalComponent  {
  /**
   * @var disenioBoton {Object} define el diseño del boton por Ej.: {class: "", iconoClass: "",  text: ""}
   * @var configModal {Object} define la configuracion del modal y diseño Ej.: {title: ""}
   * @var usuarioid {number} identificador de un usuario
   */
  @Input("disenioBoton") public disenioBoton: BotonDisenio;
  @Input("configModal") public configModal: ModalConfig;
  @Input("usuarioid") public usuarioid: number;

  constructor(private modalService: NgbModal) {}

    abrirModal(datosUsuario: any) {
      const modalRef = this.modalService.open(UsuarioModalContent);
      modalRef.componentInstance.configModal = this.configModal;
      modalRef.componentInstance.datosUsuario = datosUsuario;
    }

    buscarUsuario() {
      if (this.usuarioid !== undefined) {
        let usuario = {
          id: this.usuarioid, nro_documento: '25262728', apellido: 'Garcia', nombre: 'Pedro',
          cuil: '25262728', cuil_prin: '20', cuil_fin: '3',
          usuario: {
            user_name: 'pgarcia',
            email: 'pgarcia@desarrollohumano.rionegro.gov.ar',
            password: '',
          }};
        this.abrirModal(usuario);
      } else {
        this.abrirModal(null);
      }
    }


}
