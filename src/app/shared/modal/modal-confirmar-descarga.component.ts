import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-confirmacion-descarga-component',
  //templateUrl: './modal-baja.component.html',
  template: `
    <button type="button" class="btn btn-md btn-success ml-1" ngbTooltip="Exportar excel" (click)="open()"><i class="far fa-file-excel"></i></button>
  `,
  providers: [NgbModalConfig, NgbModal]

})
export class ModalConfirmacionDescargaComponent {
  /**
   * @var recursoid {number} identificador de una persona
   * @function {Object} devuelve los datos de la persona
   */
  @Output("confirmacion") public confirmacion = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalConfirmacionDescargaContent, {  centered: true });
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
          return this.confirmacion.emit(false);
        }else{
          // obtengo el resultado de la operacion.
          return this.confirmacion.emit(result);
        }
      }
    )
  }
}


@Component({
  //templateUrl: './modal-confirmacion-baja.content.html'
  selector: 'modal-confirmacion-descarga-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmar Descarga!</h4>
    </div>
    <div class="modal-body">
      <p>¿Esta seguro que desea descargar el archivo?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="confirmacion(false)">No</button>
      <button type="button" class="btn btn-success" (click)="confirmacion(true)">Si</button>
    </div>
  `
})
export class ModalConfirmacionDescargaContent {
  constructor(public activeModal: NgbActiveModal) {}

  public confirmacion(confirma: boolean) {
    this.activeModal.close(confirma);
  }
}
