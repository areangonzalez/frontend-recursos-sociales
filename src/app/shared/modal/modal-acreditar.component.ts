import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';
import { RecursoSocialService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'modal-acreditar-content',
  templateUrl: './modal-acreditar.content.html'
})
export class ModalAcreditarContent {
  @Input("recursoid") public recursoid: any;
  public formAcreditar: FormGroup;
  public submitted: boolean = false;
  private fecha_acreditacion: string;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _recursoService: RecursoSocialService,
    private _mensajeService: MensajesService
  ) {
    this.formAcreditar = _fb.group({
      fechaAcreditacion: ['', Validators.required]
    });
  }

  get form(){return this.formAcreditar.controls;}

  /**
   * Envio el id de persona al componente padre del modal-content
   * @param recursoid identificador de la persona que ha sido guardada
   */
  public guardar() {
    this.submitted = true;

    if (this.formAcreditar.invalid) {
      this._mensajeService.cancelado("No se ha ingresado ninguna fecha de acreditación", [{name:''}]);
      return;
    }else{
      let param = {fecha_acreditacion: this.FormatFecha(this.formAcreditar.value.fechaAcreditacion)}
      this._recursoService.acreditar(param, this.recursoid).subscribe(
        result => {
          this._mensajeService.exitoso('Se ha confirmado la acreditación.', [{name:''}]);
          this.activeModal.close(true);
        }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }
  }
  /**
   * cancelo el modal y lo cierro.
   * @param cancelar cierra el modal si el valor es true
   */
  public cancelar() {
    const modRefConfirmarCancelarAcreditado = this.modalService.open(ModalConfirmarCanceladoAcreditarContent, {centered:true});
    modRefConfirmarCancelarAcreditado.result.then( (result) => {
      if (result){
        this.activeModal.close('closed');
      }
    });
  }

  public FormatFecha(obj:any){
    let fecha = this._utilService.formatearFecha(obj.day, obj.month, obj.year, 'yyyy-MM-dd');
    return fecha;
  }
}

@Component({
  selector: 'modal-acreditar-component',
  templateUrl: './modal-acreditar.component.html',
  providers: [NgbModalConfig, NgbModal]

})
export class ModalAcreditarComponent {
  /**
   * @var recursoid {number} identificador de una persona
   * @function {Object} devuelve los datos de la persona
   */
  @Input("recursoid") public recursoid: any;
  @Output("obtenerRecurso") public obtenerRecurso = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalAcreditarContent, {  centered: true });
    modalRef.componentInstance.recursoid = this.recursoid;
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el resultado de la operación.
          return this.obtenerRecurso.emit(result);
        }
      }
    )
  }
}

@Component({
  selector: 'modal-confirmar-cancelado-acreditar-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Cancelar Acreditación</h4>
    </div>
    <div class="modal-body">
      <p>¿Esta seguro que desea cancelar la acreditación?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="confirmacion(false)">No</button>
      <button type="button" class="btn btn-success" (click)="confirmacion(true)">Si</button>
    </div>
  `
})
export class ModalConfirmarCanceladoAcreditarContent {
  constructor(public activeModal: NgbActiveModal,
    private config: NgbModalConfig
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

  public confirmacion(confirma: boolean) {
    this.activeModal.close(confirma);
  }
}
