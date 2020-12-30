import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramaService, LocalidadService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'app-configurar-usuario-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Configurar Datos del Usuario</h4>
      <button type="button" class="close" aria-label="Close" (click)="_activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <admin-config-usuario-tabs [configListas]="listas"></admin-config-usuario-tabs>
    </div>
  `,
  styleUrls: ['./configurar-usuario-modal.component.sass']
})
export class ConfigurarUsuarioModalContent {
  @Input("listas") public listas: any;

  constructor(public _activeModal: NgbActiveModal) { }

  cancelarModal(cancelar: boolean) {
    this._activeModal.close("closed");
  }


}
@Component({
  selector: 'admin-configurar-usuario-modal',
  templateUrl: './configurar-usuario-modal.component.html'
})
export class ConfigurarUsuarioModalComponent {
  @Input("usuarioid") public usuarioid: number;
  public listaProgramas: any = [];
  public listaPermisos: any = [];
  public listaLocalidades: any = [];

  constructor(private _modalService: NgbModal, private _programaService: ProgramaService, private _localidadService: LocalidadService, private _msj: MensajesService)
  {
    this.listarProgramas();
    this.listarPermisos();
    this.listarLocalidades();
  }


  abrirModal(datosUsuario: any, listas: any) {
    const modalRef = this._modalService.open(ConfigurarUsuarioModalContent, { size: "lg" });
    modalRef.componentInstance.listas = listas;
    modalRef.componentInstance.datosUsuario = datosUsuario;
  }

  configurarModal() {
    // pido usuario por api
    let usuario = {
      id: this.usuarioid, nro_documento: '25262728', apellido: 'Garcia', nombre: 'Pedro',
      cuil: '25262728', cuil_prin: '20', cuil_fin: '3',
      usuario: {
        user_name: 'pgarcia',
        email: 'pgarcia@desarrollohumano.rionegro.gov.ar',
        password: '',
      }};

    let listas: any = {
      permisos: this.listaPermisos,
      programas: this.listaProgramas,
      localidades: this.listaLocalidades
    };
    this.abrirModal(usuario, listas);

  }
  /**
   * Obtengo el listado de programas
   */
  listarProgramas() {
    this._programaService.listar().subscribe(
      programas => { this.listaProgramas = programas; },
      error => { this._msj.cancelado(error, [{name: ""}]); }
    )
  }
  /**
   * Obtengo el listado de permisos
   */
  listarPermisos() {
    this.listaPermisos = [];
  }

  listarLocalidades() {
    this._localidadService.listar().subscribe(
      localidad => { this.listaLocalidades = localidad; },
      error => { this._msj.cancelado(error, [{name: ''}]); }
    );
  }



}
