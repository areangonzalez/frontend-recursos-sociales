import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService, MensajesService, ConfiguracionParaPaginarService } from 'src/app/core/services';
import { ModalConfig, BotonDisenio, ConfigurarPagina } from 'src/app/core/models';



@Component({
  selector: 'shared-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.sass'],
})
export class BuscarPersonaComponent implements OnInit {
  @Output("personaElegida") public personaElegida = new EventEmitter();
  public busqueda = "";
  public listaPersonas: any = [];
  public configModal: ModalConfig = {title:"Crear beneficiario"};
  public botonAgregar: BotonDisenio = {class: "btn btn-success", iconoClass: "fas fa-user-plus",  text: ""};
  public page:number = 1;
  public pageSize:number = 0;
  public colleccionSize:number = 0;
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes
  public filtradoBusqueda: any = {};

  constructor(
    private _cd: ChangeDetectorRef,
    private _personaService: PersonaService,
    private _mensajeService: MensajesService, private _configuracionPaginacion: ConfiguracionParaPaginarService
  ){}

  ngOnInit(){}

  public buscar(params:any, pagina:number){
    Object.assign(params, { page: pagina-1, pagesize: 8 });
    console.log(params);

    this._personaService.buscar(params).subscribe(
      datos => {
        this.prepararListadoPersona(datos, 1);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public actualizarBusqueda(palabra: string) {
    this.busqueda = palabra;
    this.buscar({ global_param: palabra }, 1);

  }

  public prepararListadoPersona(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configuracionPaginacion.config(listado, pagina);

    this.listaPersonas = listado.resultado;
  }


  public seleccionarPersona(id, persona){
    const datos: object = {id:id, persona: persona};
    this.personaElegida.emit(datos);
  }

  public direccion(lugar){
    let dir = "";
    dir += lugar['localidad'];
    dir += (lugar['barrio'] != '') ? " - " + lugar['barrio'] : '';
    dir += ' - ' + lugar['calle'] + ' ' + lugar['altura'];
    dir += (lugar['escalera'] != '') ? ' - Esc/Mod: ' + lugar['escalera'] : '';
    dir += (lugar['piso'] != '') ? ' - Piso: ' + lugar['piso'] : '';
    dir += (lugar['depto'] != '') ? ' - Dpto: ' + lugar['depto'] : '';

    return dir;
  }

  public cambioPagina(page){
    this.buscar(this.busqueda, page);
  }

  public personaCreada(personaid) {
    const datos: object = {id: personaid};
    this.personaElegida.emit(datos);
  }

  limpiarBusqueda() {
    this.busqueda = "";
    this.listaPersonas = [];
    this.configPaginacion.colleccionSize = 0;
    this.configPaginacion.page = 1;
  }

  public isEnter(e:any) {
    if (e.keyCode == 13){
      this.actualizarBusqueda
      this.buscar(this.busqueda, this.page);
    }
  }
}
