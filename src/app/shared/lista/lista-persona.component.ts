import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: []
})
export class ListaPersonaComponent implements OnInit {
  @Input("personas") public personas:any;
  @Output("borrarPersona") public borrarPersona = new EventEmitter();

  constructor(){}

  ngOnInit() {
  }


  borrar(id:number){
    this.borrarPersona.emit({id:id});
  }
}
