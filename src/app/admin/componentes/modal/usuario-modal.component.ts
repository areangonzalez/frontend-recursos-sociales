import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-usuario-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{tipo}} Usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello WORLD!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class UsuarioModalContent {
  @Input("tipo") public tipo: string; // "Agregar/Editar" es un string usado para mostrar que tipo de formulario visualizara
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'admin-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.sass']
})
export class UsuarioModalComponent  {
  @Input("tipo") public tipo: string; // "Agregar/Editar" es un string usado para mostrar que tipo de formulario visualizara

  constructor(private modalService: NgbModal) {}

    open() {
      const modalRef = this.modalService.open(UsuarioModalContent, { size: 'lg' });
      modalRef.componentInstance.tipo = this.tipo;
    }

}
