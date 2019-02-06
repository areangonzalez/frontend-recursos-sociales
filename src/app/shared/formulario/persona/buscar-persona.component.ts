import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/core/services';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';


@Component({
  selector: 'shared-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.sass']
})
export class BuscarPersonaComponent implements OnInit {
  @Output("personaElegida") public personaElegida = new EventEmitter();
  public busqueda = "";
  public listaPersonas: any = [];
  public configModal: ModalConfig = {title:"Crear persona"};
  public botonAgregar: BotonDisenio = {class: "btn btn-success", iconoClass: "fas fa-user-plus",  text: ""};

  constructor(
    private _route: Router,
    private _personaService: PersonaService
  ){}

  ngOnInit() {
  }

  public buscar(busqueda){
    const params: object = {global_search:busqueda, _limit:3};

    this._personaService.buscar(params).subscribe(
      datos => {
        if (datos.resultado != undefined && datos.resultado.length >= 0){
          this.listaPersonas = datos.resultado;
        }else if (datos.length >= 0){
          this.listaPersonas = datos;
        }else{
          console.log("datos no contiene nada");
        }
      }, error => {
        console.log(error);
      });
  }


  public seleccionarPersona(id, persona){
    const datos: object = {id:id, persona: persona};
    this.personaElegida.emit(datos);
  }

  public direccion(lugar){
    let dir = "";
    dir += lugar['localidad'] + " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura'];
    dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
    dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
    dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

    return dir;
  }
}
