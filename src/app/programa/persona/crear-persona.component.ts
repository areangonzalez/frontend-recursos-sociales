import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'programa-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: []
})
export class CrearPersonaComponent implements OnInit {
  //public title = 'todos los programas';

  constructor(
    private _route: Router
  ){}

  ngOnInit() {
  }

  public guardar(e){
    console.log("algun valor: ",e);
  }
}
