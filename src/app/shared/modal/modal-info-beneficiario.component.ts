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
    console.log(beneficiarioid);
    this._beneficiarioService.beneficiarioPorId(beneficiarioid)
    .pipe(map(vbenficiario => {
      let datos = { persona: {}, recursos: {} };
      let auxPrograma = [];

      for (const clave in vbenficiario.recurso_lista) {
        let i = 0;
        for (const key in vbenficiario.recurso_lista[clave]) {
          if ( auxPrograma.length > 0 ) {
            let existe = false;
            for (const k in auxPrograma) {
              if ( auxPrograma[k]["programa"] == vbenficiario.recurso_lista[clave][key].programa ) {
                existe = true;
              }
            }
            if (!existe) {
              auxPrograma.push({ "programa": vbenficiario.recurso_lista[clave][key].programa });
            }
          }else{
            auxPrograma.push({ "programa": vbenficiario.recurso_lista[clave][key].programa });
          }
        }
      }

      for (const j in vbenficiario.recurso_lista) {
        for (let k = 0; k < vbenficiario.recurso_lista[j].length; k++) {
          for (let i = 0; i < auxPrograma.length; i++) {
            if ( auxPrograma[i].programa == vbenficiario.recurso_lista[j][k].programa ) {
              auxPrograma[i]["recurso"] = vbenficiario.recurso_lista[j];
              auxPrograma[i]["recurso_cantidad"] = vbenficiario.recurso_lista[j].length;
            }
          }
        }
      }
      datos.recursos = auxPrograma;
      delete vbenficiario.recurso_lista;
      datos.persona = vbenficiario;

      return datos;
    }))
    .subscribe(
      beneficiario => {
        this.recursos = beneficiario.recursos;
        this.persona = beneficiario.persona;
        console.log(beneficiario);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
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

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private _loaderService: LoaderService
  ) {
    config.backdrop = true;
    config.keyboard = true;
  }

  open() {
    const modalRef = this.modalService.open(ModalInfoBeneficiarioContent, {size: 'lg'});
    modalRef.componentInstance.beneficiarioid = this.beneficiarioid;
  }
}
