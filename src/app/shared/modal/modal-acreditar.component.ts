import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';
import { RecursoSocialService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'modal-acreditar-content',
  templateUrl: './modal-acreditar.content.html'
})
export class ModalAcreditarContent implements OnInit{
  @Input("recursoid") public recursoid: any;
  @Input("recursoCuota") public recursoCuota: any;
  public formAcreditar: FormGroup;
  public submitted: boolean = false;
  private fecha_acreditacion: string;
  public errorMonto: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _recursoService: RecursoSocialService,
    private _mensajeService: MensajesService
  ) {
    this.formAcreditar = _fb.group({
      fechaAcreditacion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.formAcreditar.patchValue({"fechaAcreditacion": this.fechaHoy()})
    if (this.recursoCuota.cuota) {
      this.formAcreditar.patchValue({"monto": this.recursoCuota.monto});
    }else {
      this.formAcreditar.patchValue({"monto": this.recursoCuota.monto_resto});
    }
  }

  public fechaHoy() {
    let fecha = new Date();
    let hoy: any = { year: fecha.getFullYear(), month: (fecha.getMonth() + 1), day: fecha.getDate() };
    return hoy;
  }

  /**
   * valido que la moneda sea numero
   * @param moneda valor a verificar
   */
   public validarMoneda(moneda) {
    if (!this._utilService.validarMoneda(moneda.value)) {
      moneda.value = moneda.value.substring(0, moneda.value.length -1);
    }
  }

  /**
   * Envio el id de persona al componente padre del modal-content
   * @param recursoid identificador de la persona que ha sido guardada
   */
  public guardar() {
    this.submitted = true;
    this.errorMonto = false;

    if (parseFloat(this.formAcreditar.get("monto").value) > parseFloat(this.recursoCuota.monto_total)) {
      this.errorMonto = true;
      this._mensajeService.cancelado("El monto no puede ser mayor al monto total.", [{name:''}]);
      return;
    }

    if (this.formAcreditar.invalid) {
      this._mensajeService.cancelado("Campos sin Completar", [{name:''}]);
      return;
    }else{
      let param = {fecha_acreditacion: this.FormatFecha(this.formAcreditar.value.fechaAcreditacion), monto: this.formAcreditar.get("monto").value}
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
  @Input("recursoCuota") public recursoCuota: any;
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
    modalRef.componentInstance.recursoCuota = this.recursoCuota;
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
