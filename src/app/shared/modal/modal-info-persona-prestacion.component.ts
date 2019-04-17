import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';
import { RecursoSocialService, MensajesService, LoaderService } from 'src/app/core/services';
import { RecursoRoutingModule } from 'src/app/recurso/recurso-routing.module';

@Component({
  selector: 'modal-info-persona-prestacion-content',
  templateUrl: './modal-info-persona-prestacion.content.html'
})
export class ModalInfoPersonaPrestacionContent implements OnInit {
  @Input("recursoid") public recursoid: any;
  @Input("recursos") public recursos: any;
  public recurso: any;
  public persona: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _recursoService: RecursoSocialService,
    private _mensajeService: MensajesService,
    private _loaderService: LoaderService

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
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public actualizarRecurso(estado:any){
    if (estado){
      this.obtenerRecurso(this.recursoid);
      this.actualizarListaRecursos(this.recursoid, estado);

    }
  }

  public actualizarListaRecursos(idRecurso: number, estado: boolean){
    for (let i = 0; i < this.recursos.length; i++) {
      if ( this.recursos[i].id == idRecurso) {
        this.recursos[i].baja = estado;
      }
    }
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

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private _loaderService: LoaderService
  ) {
    config.backdrop = true;
    config.keyboard = true;
  }

  open() {
    const modalRef = this.modalService.open(ModalInfoPersonaPrestacionContent, {size: 'lg'});
    modalRef.componentInstance.recursoid = this.recursoid;
    modalRef.componentInstance.recursos = this.recursos;
  }
}
