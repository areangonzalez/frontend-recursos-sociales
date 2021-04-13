import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';
import { RecursoSocialService, MensajesService, LoaderService, CuotaService } from 'src/app/core/services';

@Component({
  selector: 'modal-info-persona-prestacion-content',
  templateUrl: './modal-info-persona-prestacion.content.html'
})
export class ModalInfoPersonaPrestacionContent implements OnInit {
  @Input("recursoid") public recursoid: any;
  @Input("recursos") public recursos: any;
  @Input("cambioEstado") public cambioEstado = new EventEmitter();
  public recurso: any;
  public persona: any;
  public cuotaListado: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _recursoService: RecursoSocialService,
    private _mensajeService: MensajesService,
    private _loaderService: LoaderService,
    private _cuotaService: CuotaService
  ) {}

  ngOnInit(){
    this.obtenerRecurso(this.recursoid);
  }

  /**
   * Obtengo el recurso mediante su identificador
   * @param recursoid identificador del recurso
   */
  public obtenerRecurso(recursoid:any) {
    this._recursoService.recursoPorId(recursoid).subscribe(
      recurso => {
        this.recurso = recurso;
        this.persona = recurso.persona;
        if (recurso.cuota) {
          this.obtenerCuota(recursoid);
        }
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }
  /**
   * actualiza el listado de recursos
   * @param estado permite la actualizacion del listado si surge algun cambio
   */
  public actualizarRecurso(estado:any){
    if (estado){
      this.obtenerRecurso(this.recursoid);
      this.cambioEstado.emit(estado);

    }
  }
  public obtenerCuota(recursoid: any) {
    this._cuotaService.listar(recursoid).subscribe(
      resultado => {
        this.cuotaListado = resultado;
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); })
  }

}

@Component({
  selector: 'modal-info-persona-prestacion-component',
  templateUrl: './modal-info-persona-prestacion.component.html',
  providers: [NgbModalConfig, NgbModal]

})
export class ModalInfoPersonaPrestacionComponent {
  /**
   * @var recursoid {number} identificador de un recurso
   * @var recursos {array} listado de los recursos
   */
  @Input("recursoid") public recursoid: any;
  @Input("recursos") public recursos: any;
  @Output("cambioEstado") public cambioEstado = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private _loaderService: LoaderService
  ) {
    config.backdrop = true;
    config.keyboard = true;
  }

  open() {
    const modalRef = this.modalService.open(ModalInfoPersonaPrestacionContent, {windowClass: 'ventana-xl'});
    modalRef.componentInstance.recursoid = this.recursoid;
    modalRef.componentInstance.recursos = this.recursos;
    modalRef.componentInstance.cambioEstado.subscribe(($e) => {
      this.cambioEstado.emit($e);
    });
  }
}
