import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-baja-usuario-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmar Baja de Usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>¿Está seguro que desea dar de BAJA al usuario <strong>{{nombreUsuario}}</strong>?</p>
    </div>
    <div class=modal-footer>
    <button type="button" class="btn btn-danger" (click)="confirmar(false)"><span class="oi oi-ban" title="Cancelar" aria-hidden="true"></span> No</button>
    <button type="button" class="btn btn-success" (click)="confirmar(true)"><i class="fa fa-arrow-down"></i> Si</button>
    </div>
  `,
  styleUrls: ['./baja-usuario-modal.component.sass']
})
export class BajaUsuarioModalContent {
  @Input("nombreUsuario") public nombreUsuario: string;

  constructor(public _activeModal: NgbActiveModal) {}
  /**
   * cierro el modal sin confirmación
   */
  cerrarModal() { this._activeModal.dismiss('closed'); }
  /**
   * Confirmacion de borrado de usuario
   */
  confirmar(confirmacion: boolean) { this._activeModal.close(confirmacion); }
}


@Component({
  selector: 'admin-baja-usuario-modal',
  templateUrl: './baja-usuario-modal.component.html',
  styleUrls: ['./baja-usuario-modal.component.sass']
})
export class BajaUsuarioModalComponent {
  @Input("nombreUsuario") public nombreUsuario: string;
  @Output("confirmarBaja") public confirmarBaja = new EventEmitter();
  constructor(
    private _modalService: NgbModal,
    private _config: NgbModalConfig
  ) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  abrirModal() {
    const modalRef = this._modalService.open(BajaUsuarioModalContent);
    modalRef.componentInstance.nombreUsuario = this.nombreUsuario;
    modalRef.result.then(
      result => {
        if (result === 'closed' ){}
        else {
          this.confirmarBaja.emit(result);
        }
      }
    )
  }
}
