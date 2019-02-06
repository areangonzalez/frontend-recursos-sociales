import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-form-persona-content',
  templateUrl: './modal-form-persona-content.html'
})
export class ModalFormPersonaContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}

  public guardar(datos:any) {
    console.log(datos);
  }
}

@Component({
  selector: 'modal-form-persona-component',
  templateUrl: './modal-form-persona.component.html',
  providers: [NgbModalConfig]

})
export class ModalFormPersonaComponent {
  /**
   * @var disenioBoton {Object} define el diseño del boton por Ej.: {class: "", iconoClass: "",  text: ""}
   */
  @Input("disenioBoton") public disenioBoton: object;

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalFormPersonaContent, {size: 'lg'});
    modalRef.componentInstance.name = 'World';
  }
}
