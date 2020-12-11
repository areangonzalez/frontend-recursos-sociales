import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotonDisenio, ModalConfig } from 'src/app/core/models';

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
      <admin-usuario-form (cancelarForm)="cancelarModal($event)"></admin-usuario-form>
    </div>
  `
})
export class UsuarioModalContent {
  @Input("configModal") public configModal:ModalConfig;
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
   * @var personaid {number} identificador de una persona
   */
  @Input("disenioBoton") public disenioBoton: BotonDisenio;
  @Input("configModal") public configModal: ModalConfig;

  constructor(private modalService: NgbModal) {}

    open() {
      const modalRef = this.modalService.open(UsuarioModalContent);
      modalRef.componentInstance.configModal = this.configModal;
    }

}
