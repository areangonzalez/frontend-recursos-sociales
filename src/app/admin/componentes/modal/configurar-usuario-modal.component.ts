import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramaService, LocalidadService, MensajesService, PermisosService, UsuarioService } from 'src/app/core/services';
import { map } from 'rxjs/operators';

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
      <admin-config-usuario-tabs [configListas]="listas" [datosUsuario]="datosUsuario"></admin-config-usuario-tabs>
    </div>
  `,
  styleUrls: ['./configurar-usuario-modal.component.sass']
})
export class ConfigurarUsuarioModalContent {
  @Input("listas") public listas: any;
  @Input("datosUsuario") public datosUsuario: any;

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

  constructor(
    private _modalService: NgbModal, private _programaService: ProgramaService,
    private _localidadService: LocalidadService, private _msj: MensajesService,
    private _permisosService: PermisosService, private _usuarioService: UsuarioService
    )
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
    let listas: any = {
      permisos: this.listaPermisos,
      programas: this.listaProgramas,
      localidades: this.listaLocalidades
    };
    // pido usuario por api
    this._usuarioService.buscarPorId(this.usuarioid)
    .pipe(map(vDatos => {
      let vUsuario: any = {
        id: vDatos['personaid'],
        nombre: vDatos['nombre'],
        apellido: vDatos['apellido'],
        cuil: vDatos['cuil'],
        nro_documento: vDatos['nro_documento'],
        usuario: {
          id: vDatos['id'],
          user_name: vDatos['user_name'],
          email: vDatos['email'],
          localidad: vDatos['localidad'],
          localidadid: vDatos['localidadid'],
          fecha_inicial: vDatos['fecha_inicial']
        }
      };
      return vUsuario;
    })).subscribe(
      datos => { this.abrirModal(datos, listas); },
      error => { this._msj.cancelado(error, [{name: ''}]); }
    );

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
    this._permisosService.listar().subscribe(
      permisos => { this.listaPermisos = permisos; },
      error => { this._msj.cancelado(error, [{name: ''}]); }
    );

  }

  listarLocalidades() {
    this._localidadService.listar().subscribe(
      localidad => { this.listaLocalidades = localidad; },
      error => { this._msj.cancelado(error, [{name: ''}]); }
    );
  }



}
