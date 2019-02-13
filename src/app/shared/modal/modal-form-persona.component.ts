import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';

@Component({
  selector: 'modal-form-persona-content',
  templateUrl: './modal-form-persona-content.html'
})
export class ModalFormPersonaContent {
  @Input("configModal") public configModal:ModalConfig;

  constructor(public activeModal: NgbActiveModal) {}

  public guardar(datos:any) {
    this.activeModal.close(datos);
  }

  public cancelar(cancelar:boolean) {
    this.activeModal.close('closed');
  }
}

@Component({
  selector: 'modal-form-persona-component',
  templateUrl: './modal-form-persona.component.html',
  providers: [NgbModalConfig, NgbModal]

})
export class ModalFormPersonaComponent {
  /**
   * @var disenioBoton {Object} define el diseño del boton por Ej.: {class: "", iconoClass: "",  text: ""}
   * @var configModal {Object} define la configuracion del modal y diseño Ej.: {title: ""}
   */
  @Input("disenioBoton") public disenioBoton: BotonDisenio;
  @Input("configModal") public configModal: ModalConfig;
  @Output("obtenerPersona") public obtenerPersona = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalFormPersonaContent, {size: 'lg'});
    modalRef.componentInstance.configModal = this.configModal;
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          return this.obtenerPersona.emit(result);
        }
      }
    )
  }
}
