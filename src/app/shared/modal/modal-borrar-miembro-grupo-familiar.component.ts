import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal-borrar-miembro-grupo-familiar.content.html'
})
export class ModalBorrarMiembroGrupoFamiliarContent {
  constructor(public activeModal: NgbActiveModal) {}

  public confirmacion(confirma: boolean) {
    this.activeModal.close(confirma);
  }
}

@Component({
  selector: 'modal-borrar-miembro-grupo-familiar-component',
  templateUrl: './modal-borrar-miembro-grupo-familiar.component.html',
  providers: [NgbModalConfig, NgbModal]
})
export class ModalBorrarMiembroGrupoFamiliarComponent {
  /**
   * @var recursoid {number} identificador de una persona
   * @function {Object} devuelve los datos de la persona
   */
  @Output("borrarMiembroGrupoFamiliar") public borrarMiembroGrupoFamiliar = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalBorrarMiembroGrupoFamiliarContent, {  centered: true });
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el resultado de la operacion.
          return this.borrarMiembroGrupoFamiliar.emit(result);
        }
      }
    )
  }
}
