import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: []
})
export class ListaPersonaComponent implements OnInit {
  @Input("personas") public personas:any;

  constructor(){}

  ngOnInit() {
  }
}
