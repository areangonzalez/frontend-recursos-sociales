import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'admin-alta-usuario-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Alta de Usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>¿Está seguro que desea dar de BAJA al usuario <strong>{{nombreUsuario}}</strong>?</p>
      <div class="row" [formGroup]="altaForm">
        <div class="form-group col-md-6">
          <label for="password" class="prioridad">Contraseña (<span>*</span>):</label>
          <input type="password" id="password" placeholder="********" class="form-control" formControlName="password" [ngClass]="{'is-invalid': (altaForm.get('password').invalid && submitted)}">
          <div *ngIf="(altaForm.get('password').invalid && submitted)"
              class="text-danger">
              <div *ngIf="altaForm.get('password').hasError('required')">Este campo es requerido. </div>
              <div *ngIf="altaForm.get('password').hasError('minlength')">La contraseña es demasiado corta, al menos debe de tener 8 caracteres.</div>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmPass" class="prioridad">Confirmar Contraseña (<span>*</span>):</label>
          <input type="password" id="confirmPass" placeholder="********" class="form-control" formControlName="confirmPass" [ngClass]="{'is-invalid': (altaForm.get('password').value != altaForm.get('confirmPass').value && altaForm.get('confirmPass').value != null)}">
          <div *ngIf="(altaForm.get('password').value != altaForm.get('confirmPass').value && altaForm.get('confirmPass').value != null)" class="text-danger">
            <div>Las contraseñas no coinciden.</div>
          </div>
        </div>
      </div>
    </div>
    <div class=modal-footer>
    <button type="button" class="btn btn-danger" (click)="cerrarModal()"><span class="oi oi-ban" title="Cancelar" aria-hidden="true"></span> No</button>
    <button type="button" class="btn btn-success" (click)="confirmar()"><i class="fa fa-arrow-down"></i> Si</button>
    </div>
  `,
  styleUrls: ['./alta-usuario-modal.component.sass']
})
export class AltaUsuarioModalContent {
  @Input("nombreUsuario") public nombreUsuario: string;
  public altaForm: FormGroup;
  public submitted: boolean = false;

  constructor(public _activeModal: NgbActiveModal, private _fb: FormBuilder) {
    this.altaForm = _fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPass: ['', [Validators.required]]
      }, { validators:  this.checkPasswords })
  }
  /**
   * Checkea la comparacion de las contraseñas para validar
   * @param group formulario que contiene los valores a comparar
   */
  checkPasswords(group: AbstractControl): { invalid: boolean } { // here we have the 'passwords' group
    if ( group.get('password').value !== group.get('confirmPass').value ) {
      return { invalid: true };
    }
  }
  /**
   * cierro el modal sin confirmación
   */
  cerrarModal() { this._activeModal.dismiss('closed'); }
  /**
   * Confirmacion de borrado de usuario
   */
  confirmar() {
    /* this.submitted = true;
    if (this.bajaForm.invalid){ return; }
    else {
      let baja: any = this.bajaForm.value;
      baja['confirmacion'] = true;
    } */
    this._activeModal.close(true);
  }
}

@Component({
  selector: 'app-alta-usuario-modal',
  templateUrl: './alta-usuario-modal.component.html',
  styleUrls: ['./alta-usuario-modal.component.sass']
})
export class AltaUsuarioModalComponent {
  @Input("nombreUsuario") public nombreUsuario: string;
  @Output("confirmarAlta") public confirmarAlta = new EventEmitter();
  constructor(
    private _modalService: NgbModal,
    private _config: NgbModalConfig
  ) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  abrirModal() {
    const modalRef = this._modalService.open(AltaUsuarioModalContent);
    modalRef.componentInstance.nombreUsuario = this.nombreUsuario;
    modalRef.result.then(
      result => {
        if (result === 'closed' ){}
        else {
          this.confirmarAlta.emit(result);
        }
      }
    )
  }

}
