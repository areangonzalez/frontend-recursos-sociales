import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      <div class="row" [formGroup]="bajaForm">
        <div class="form-group col-md-12">
          <label for="observacion">¿Por qué?:</label>
          <textarea class="form-control" id="observacion" cols="30" rows="1" placeholder="Porque..." formControlName="descripcion_baja" ></textarea>
          <div *ngIf="(bajaForm.get('descripcion_baja').invalid && submitted)"
              class="text-danger">
              <div *ngIf="bajaForm.get('descripcion_baja').hasError('required')">Este campo es requerido. </div>
              <div *ngIf="bajaForm.get('descripcion_baja').hasError('minlength')">La explicación es muy corta...</div>
          </div>
        </div>
      </div>
    </div>
    <div class=modal-footer>
    <button type="button" class="btn btn-danger" (click)="cerrarModal()"><span class="oi oi-ban" title="Cancelar" aria-hidden="true"></span> No</button>
    <button type="button" class="btn btn-success" (click)="confirmar()"><i class="fa fa-arrow-down"></i> Si</button>
    </div>
  `,
  styleUrls: ['./baja-usuario-modal.component.sass']
})
export class BajaUsuarioModalContent {
  @Input("nombreUsuario") public nombreUsuario: string;
  public bajaForm: FormGroup;
  public submitted: boolean = false;

  constructor(public _activeModal: NgbActiveModal, private _fb: FormBuilder) {
    this.bajaForm = _fb.group({
      descripcion_baja: ['', [Validators.required, Validators.minLength(15)]]
    })
  }
  /**
   * cierro el modal sin confirmación
   */
  cerrarModal() { this._activeModal.dismiss('closed'); }
  /**
   * Confirmacion de borrado de usuario
   */
  confirmar() {
    this.submitted = true;
    if (this.bajaForm.invalid){ return; }
    else {
      let baja: any = this.bajaForm.value;
      baja['confirmacion'] = true;
      this._activeModal.close(baja);
    }
  }
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
