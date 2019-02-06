import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-form-persona-content',
  templateUrl: './modal-form-persona-content.html'
})
export class ModalFormPersonaContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'modal-form-persona-component',
  templateUrl: './modal-form-persona.component.html'
})
export class ModalFormPersonaComponent {
  /**
   * @var disenioBoton {Object} define el diseño del boton por Ej.: {class: "", iconoClass: "",  text: ""}
   */
  @Input("disenioBoton") public disenioBoton: object;

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ModalFormPersonaContent);
    modalRef.componentInstance.name = 'World';
  }
}
