import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService, MensajesService } from 'src/app/core/services';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';



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

  constructor(
    private _cd: ChangeDetectorRef,
    private _personaService: PersonaService,
    private _mensajeService: MensajesService
  ){}

  ngOnInit(){}

  public buscar(busqueda:string, pagina:number){
    let pag = pagina - 1;
    const params: object = {global_param:busqueda, pagesize: 8, page: pag};
    this._personaService.buscar(params).subscribe(
      datos => {
        this.colleccionSize = datos.total_filtrado;
        this.pageSize = datos.pagesize;
        this.listaPersonas = datos.resultado;
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
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
  }

  public isEnter(e:any) {
    if (e.keyCode == 13){
      this.buscar(this.busqueda, this.page);
    }
  }
}
