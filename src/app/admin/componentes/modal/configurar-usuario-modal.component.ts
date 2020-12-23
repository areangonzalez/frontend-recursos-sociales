import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramaService } from 'src/app/core/services';

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

  constructor(private _modalService: NgbModal, private _programaService: ProgramaService)
  {
    this.listarProgramas();
    this.listarPermisos();
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
      console.log(this.listaProgramas);

    let listas: any = {
      permisos: this.listaPermisos
    };
    this.abrirModal(usuario, listas);

  }
  /**
   * Obtengo el listado de programas
   */
  listarProgramas() {
    this._programaService.listar().subscribe(
      programas => {
        this.listaProgramas = programas;
      }
    )
  }
  /**
   * Obtengo el listado de permisos
   */
  listarPermisos() {
    this.listaPermisos = [
      "3_crear", "3_ver", "3_baja", "3_acreditar",
      "5_crear", "5_ver", "5_baja", "5_acreditar",
      "4_crear", "4_ver", "4_baja", "4_acreditar",
      "2_crear", "2_ver", "2_baja", "2_acreditar",
      "1_crear", "1_ver", "1_baja", "1_acreditar",
      "6_crear", "6_ver", "6_baja", "6_acreditar"
   ];
    /* this._programaService.listar().subscribe(
      programas => {
        this.listaProgramas = programas;
      }
    ) */
  }



}
