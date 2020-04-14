import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';


@Component({
  selector: 'modal-grupo-familiar-content',
  templateUrl: './modal-grupo-familiar.content.html'
})
export class ModalGrupoFamiliarContent {

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
  selector: 'modal-grupo-familiar-component',
  templateUrl: './modal-grupo-familiar.component.html',
  providers: [NgbModalConfig, NgbModal]
})
export class ModalGrupoFamiliarComponent {
  /**
   * @var disenioBoton {Object} define el diseño del boton por Ej.: {class: "", iconoClass: "",  text: ""}
   * @var configModal {Object} define la configuracion del modal y diseño Ej.: {title: ""}
   * @var personaid {number} identificador de una persona
   * @function {Object} devuelve los datos de la persona
   */
  @Output("obtenerGrupoFamiliar") public obtenerGrupoFamiliar = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalGrupoFamiliarContent, {windowClass: 'modal-md'});
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el grupo familiar.
          return this.obtenerGrupoFamiliar.emit(result);
        }
      }
    )
  }
}
