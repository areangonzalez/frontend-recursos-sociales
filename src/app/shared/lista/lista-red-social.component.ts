import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-lista-red-social',
  templateUrl: './lista-red-social.component.html',
  styleUrls: []
})
export class ListaRedSocialComponent implements OnInit {
  /* @Input("personas") public personas:any;
  @Input("mostrar") public mostrar:boolean;
  @Output("borrarPersona") public borrarPersona = new EventEmitter(); */

  constructor(){}

  ngOnInit() {
  }


  /* borrar(id:number){
    this.borrarPersona.emit({id:id});
  } */

  /* public direccion(lugar){
    let dir = "";
    dir += lugar['localidad'] + " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura'];
    dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
    dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
    dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

    return dir;
  } */
}