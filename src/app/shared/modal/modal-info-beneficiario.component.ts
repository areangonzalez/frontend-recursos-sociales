import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';
import { MensajesService, LoaderService, BeneficiarioService } from 'src/app/core/services';
import { map } from 'rxjs/operators';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'modal-info-beneficirio-content',
  templateUrl: './modal-info-beneficiario.content.html'
})
export class ModalInfoBeneficiarioContent implements OnInit {
  @Input("beneficiarioid") public beneficiarioid: any;
  @Output("cambioEstado") public cambioEstado = new EventEmitter();
  public recursos: any;
  public persona: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _mensajeService: MensajesService,
    private _loaderService: LoaderService,
    private _beneficiarioService: BeneficiarioService,
    private _utilService: UtilService

  ) {}

  ngOnInit(){
    this.obtenerRecurso(this.beneficiarioid);
  }


  /**
   * Obtengo el recurso mediante su identificador
   * @param beneficiarioid identificador del beneficiario
   */
  public obtenerRecurso(beneficiarioid:any) {
    this._beneficiarioService.beneficiarioPorId(beneficiarioid)
    .pipe(map(vbenficiario => {
      let datos = { persona: {}, recursos: {} };

      datos.recursos = vbenficiario.recurso_lista;
      delete vbenficiario.recurso_lista;
      datos.persona = vbenficiario;

      return datos;
    }))
    .subscribe(
      beneficiario => {
        this.recursos = beneficiario.recursos;
        this.persona = beneficiario.persona;
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  actualizarInfoBeneficiario(estado){
    if (estado){
      this.obtenerRecurso(this.beneficiarioid);
      this.cambioEstado.emit(estado);
    }
  }

}

@Component({
  selector: 'modal-info-beneficiario-component',
  templateUrl: './modal-info-beneficiario.component.html',
  providers: [NgbModalConfig, NgbModal]

})
export class ModalInfoBeneficiarioComponent {
  /**
   * @var beneficiarioid {number} identificador de un beneficiario
   */
  @Input("beneficiarioid") public beneficiarioid: any;
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
    const modalRef = this.modalService.open(ModalInfoBeneficiarioContent, {windowClass: 'ventana-xl'});
    modalRef.componentInstance.beneficiarioid = this.beneficiarioid;
    modalRef.componentInstance.cambioEstado.subscribe(($e) => {
      this.cambioEstado.emit($e);
    });
  }
}
