import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';


@Component({
  selector: 'modal-red-social-content',
  templateUrl: './modal-red-social.content.html'
})
export class ModalRedSocialContent {

  constructor(public activeModal: NgbActiveModal){}
  /**
   * Recibo los datos del formulario y los envio al listado
   * @param datos objeto que obtiene los datos de una red social
   */
  public datosLista(datos:any) {
    this.activeModal.close(datos);
  }

  /**
   * cancelo el modal y lo cierro.
   * @param cancelar cierra el modal si el valor es true
   */
  public cancelar(cancelar:boolean) {
    if (cancelar){
      this.activeModal.close('closed');
    }
  }

}

@Component({
  selector: 'modal-red-social-component',
  templateUrl: './modal-red-social.component.html',
  providers: [NgbModalConfig, NgbModal]
})
export class ModalRedSocialComponent {
  /**
   * @var disenioBoton {Object} define el diseño del boton por Ej.: {class: "", iconoClass: "",  text: ""}
   * @var configModal {Object} define la configuracion del modal y diseño Ej.: {title: ""}
   * @var personaid {number} identificador de una persona
   * @function {Object} devuelve los datos de la persona
   */
  @Output("obtenerRedSocial") public obtenerRedSocial = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalRedSocialContent, {windowClass: 'modal-md'});
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el id persona desde el content.
          return this.obtenerRedSocial.emit(result);
        }
      }
    )
  }
}
