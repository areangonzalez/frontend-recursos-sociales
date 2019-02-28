import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';
import { RecursoSocialService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'modal-info-persona-prestacion-content',
  templateUrl: './modal-info-persona-prestacion.content.html'
})
export class ModalInfoPersonaPrestacionContent implements OnInit {
  @Input("recursoid") public recursoid: any;
  public recurso: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _recursoService: RecursoSocialService,
    private _mensajeService: MensajesService
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
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
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
   * @function {Object} devuelve los datos de la persona
   */
  @Input("recursoid") public recursoid: any;

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = true;
    config.keyboard = true;
  }

  open() {
    const modalRef = this.modalService.open(ModalInfoPersonaPrestacionContent, {size: 'lg'});
    modalRef.componentInstance.recursoid = this.recursoid;
  }
}
