import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/core/services';
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
  public configModal: ModalConfig = {title:"Crear persona"};
  public botonAgregar: BotonDisenio = {class: "btn btn-success", iconoClass: "fas fa-user-plus",  text: ""};
  public page:number = 1;
  public pageSize:number = 0;
  public colleccionSize:number = 0;

  constructor(
    private _route: Router,
    private _personaService: PersonaService
  ){}

  ngOnInit() {
  }

  public buscar(busqueda:string, pagina:number){
    let pag = pagina - 1;
    const params: object = {global_search:busqueda, pagesize: 3, page: pag};

    this._personaService.buscar(params).subscribe(
      datos => {
        this.colleccionSize = datos.total_filtrado;
        this.pageSize = datos.pagesize;
        this.listaPersonas = datos.resultado;
        /* if (datos.resultado != undefined && datos.resultado.length >= 0){
        }else if (datos.length >= 0){
          this.listaPersonas = datos;
        }else{
          console.log("datos no contiene nada");
        } */
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

  public cambioPagina(page){
    this.buscar(this.busqueda, page);
  }
}
