import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';
import { RecursoSocialService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'modal-baja-content',
  templateUrl: './modal-baja.content.html'
})
export class ModalBajaContent {
  @Input("recursoid") public recursoid: any;
  @Output("darBaja") public darBaja = new EventEmitter();
  public formBaja: FormGroup;
  public submitted: boolean = false;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _recursoService: RecursoSocialService,
    private _mensajeService: MensajesService
  ) {
    this.formBaja = _fb.group({
      fechaBaja: ['', Validators.required],
      descripcion_baja: ''
    });
  }

  get form(){return this.formBaja.controls;}

  /**
   * Envio el id de persona al componente padre del modal-content
   * @param recursoid identificador de la persona que ha sido guardada
   */
  public validar() {
    this.submitted = true;

    if (this.formBaja.invalid) {
      this._mensajeService.cancelado("No se ha ingresado ninguna fecha de baja", [{name:''}]);
      return false;
    }else{
      return true;
    }
  }
  /**
   * cancelo el modal y lo cierro.
   * @param cancelar cierra el modal si el valor es true
   */
  public cancelar() {
    this.activeModal.close('closed');
  }

  public FormatFecha(obj:any){
    let fecha = this._utilService.formatearFecha(obj.day, obj.month, obj.year, 'yyyy-MM-dd');
    return fecha;
  }

  private guardar() {
    let param = {fecha_baja: this.FormatFecha(this.formBaja.value.fechaBaja), descripcion_baja: this.formBaja.value.descripcion_baja}

    this._recursoService.baja(param, this.recursoid).subscribe(
      result => {
        this._mensajeService.exitoso('Se ha confirmado la baja.', [{name:''}]);
        this.activeModal.close(true);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  confirmar() {
    if (this.validar() !== false){
      const modalReferencia = this.modalService.open(ModalConfirmacionContent, {
        centered: true
      });

      modalReferencia.result.then(
        result => {
          if (result == false) {
            this.activeModal.close();
          }else{
            this.guardar();
          }
        });
    }

  }
}

@Component({
  selector: 'modal-baja-component',
  templateUrl: './modal-baja.component.html',
  providers: [NgbModalConfig, NgbModal]

})
export class ModalBajaComponent {
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
    const modalRef = this.modalService.open(ModalBajaContent, {  centered: true });
    modalRef.componentInstance.recursoid = this.recursoid;
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el resultado de la operacion.
          return this.obtenerRecurso.emit(result);
        }
      }
    )
  }
}

@Component({
  templateUrl: './modal-confirmacion-baja.content.html'
})
export class ModalConfirmacionContent {
  constructor(public activeModal: NgbActiveModal) {}

  public confirmacion(confirma: boolean) {
    this.activeModal.close(confirma);
  }
}
