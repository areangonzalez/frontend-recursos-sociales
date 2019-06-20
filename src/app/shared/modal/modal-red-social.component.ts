import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MensajesService, TipoRedSocialService } from 'src/app/core/services';

@Component({
  selector: 'modal-red-social-content',
  templateUrl: './modal-red-social.content.html'
})
export class ModalRedSocialContent implements OnInit {
  /* @Input("configModal") public configModal:ModalConfig;
  @Input("personaid") public personaid: any;
 */
  public redSocialForm: FormGroup;
  public submitted: boolean = false;
  public tipoRedSocialLista = [];

  constructor(public activeModal: NgbActiveModal, private _fb: FormBuilder, private _mensajeService: MensajesService, private _tipoRedSocialService: TipoRedSocialService){
    this.redSocialForm = _fb.group({
      redSocial: _fb.group({
        tipo_red_socialid: ['', Validators.required],
        perfil: ['', Validators.required]
      })
    });
  }

  ngOnInit(){
    this.tipoRedSocial();
  }

  public tipoRedSocial() {
    this._tipoRedSocialService.listar().subscribe(
      datos => {
        this.tipoRedSocialLista = datos;
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); }
    );
  }

  /**
   * Valido el formulario antes de guardar
   * @param recursoid identificador de la persona que ha sido guardada
   */
  public validar() {
    this.submitted = true;
    if (this.redSocialForm.invalid) {
      this._mensajeService.cancelado("¡Error! Campos sin completar.", [{name:''}]);
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
  /**
   * Verifico los datos antes de enviar el guardar al listado
   */
  public guardar() {
    this.submitted = true;

    if (this.redSocialForm.invalid) {
      this._mensajeService.cancelado("¡Error! Campos sin completar", [{name:''}]);
      return;
    }else{
      for (let i = 0; i < this.tipoRedSocialLista.length; i++) {
        const element = this.tipoRedSocialLista[i];

      }
      this._mensajeService.exitoso('Se ha creado una nueva red social.', [{name:''}]);
      this.activeModal.close(true);
    }
  }
}

@Component({
  selector: 'modal-red-social-component',
  templateUrl: './modal-red-social.component.html',
  providers: [NgbModalConfig, NgbModal]
})
export class ModalRedSocialComponent {
  /**
   * @var disenioBoton {Object} define el diseño del boton por Ej.: {class: "", iconoClass: "",  text: ""}
   * @var configModal {Object} define la configuracion del modal y diseño Ej.: {title: ""}
   * @var personaid {number} identificador de una persona
   * @function {Object} devuelve los datos de la persona
   */
  /* @Input("disenioBoton") public disenioBoton: BotonDisenio;
  @Input("configModal") public configModal: ModalConfig;
  @Input("personaid") public personaid: any;
  @Output("obtenerPersona") public obtenerPersona = new EventEmitter(); */

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalRedSocialContent, {windowClass: 'modal-md'});
    /* modalRef.componentInstance.configModal = this.configModal;
    modalRef.componentInstance.personaid = this.personaid;
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el id persona desde el content.
          return this.obtenerPersona.emit(result);
        }
      }
    ) */
  }
}
