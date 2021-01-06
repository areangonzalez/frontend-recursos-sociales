import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurarPagina } from 'src/app/core/models';
import { ConfiguracionParaPaginarService, UsuarioService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'admind-gestor-usuario',
  templateUrl: './gestor-usuario.component.html',
  styleUrls: ['./gestor-usuario.component.sass']
})
export class GestorUsuarioComponent implements OnInit {
  public listaUsuarios: any = [];
  public busqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina();

  constructor(private _route: ActivatedRoute, private _usuarioService: UsuarioService, private _configPagina: ConfiguracionParaPaginarService, private _msj: MensajesService) { }

  ngOnInit() {
    this.prepararListadoUsuario(this._route.snapshot.data["usuarios"], 1);
  }
  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
  public realizarBusqueda(apiBusqueda:any, page: number) {
    // Agrego la paginacion a la busqueda avanzada
    Object.assign(apiBusqueda, {page: page-1, pagesize: 20});
    // agrego la busqueda en la nueva variable
    this.busqueda = apiBusqueda;
    // configuro para que se dirija a la primera pagina
    this.configPaginacion.page = 1;
    // realizo la busqueda
    console.log(apiBusqueda);
    this._usuarioService.buscar(apiBusqueda).subscribe(
      respuesta => {
        this.prepararListadoUsuario(respuesta, page);
      }, error => { this._msj.cancelado(error, [{name:''}]); }
    )
  }
  prepararListadoUsuario(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configPagina.config(listado, pagina);

    this.listaUsuarios = listado.resultado;
  }
  /**
   * Solicito el cambio de pagina
   * @param pagina numero de pagina
   */
  cambiarPagina(pagina:any) {
    this.realizarBusqueda(this.busqueda, pagina);
  }
}
