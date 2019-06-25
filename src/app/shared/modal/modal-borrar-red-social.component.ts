import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal-borrar-red-social.content.html'
})
export class ModalBorrarRedSocialContent {
  constructor(public activeModal: NgbActiveModal) {}

  public confirmacion(confirma: boolean) {
    this.activeModal.close(confirma);
  }
}

@Component({
  selector: 'modal-borrar-red-social-component',
  templateUrl: './modal-borrar-red-social.component.html',
  providers: [NgbModalConfig, NgbModal]
})
export class ModalBorrarRedSocialComponent {
  /**
   * @var recursoid {number} identificador de una persona
   * @function {Object} devuelve los datos de la persona
   */
  @Output("borrarRedSocial") public borrarRedSocial = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalBorrarRedSocialContent, {  centered: true });
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el resultado de la operacion.
          return this.borrarRedSocial.emit(result);
        }
      }
    )
  }
}
