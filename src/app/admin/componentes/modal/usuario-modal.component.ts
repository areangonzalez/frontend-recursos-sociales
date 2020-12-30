import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotonDisenio, ModalConfig } from 'src/app/core/models';
import { PersonaService, LocalidadService, MensajesService } from 'src/app/core/services';

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
      <admin-usuario-form [localidades]="localidades" (cancelarForm)="cancelarModal($event)"></admin-usuario-form>
    </div>
  `
})
export class UsuarioModalContent {
  @Input("configModal") public configModal:ModalConfig;
  @Input("localidades") public localidades:any;
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
   * @var usuarioid {number} identificador de un usuario
   */
  @Input("disenioBoton") public disenioBoton: BotonDisenio;
  @Input("configModal") public configModal: ModalConfig;
  @Input("usuarioid") public usuarioid: number;
  public listaLocalidades: any = [];

  constructor(private modalService: NgbModal, private _localidadService: LocalidadService, private _msj: MensajesService) {
    this.listarLocalidades();
  }

    abrirModal() {
      const modalRef = this.modalService.open(UsuarioModalContent);
      modalRef.componentInstance.configModal = this.configModal;
      modalRef.componentInstance.localidades = this.listaLocalidades;
    }


    listarLocalidades() {
      this._localidadService.listar().subscribe(
        lista => {
          this.listaLocalidades = lista;
        }, error => { this._msj.cancelado(error, [{name:''}]); }
      );
    }

}
