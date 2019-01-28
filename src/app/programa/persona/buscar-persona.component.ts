import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'programa-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: []
})
export class ProgramaBuscarPersonaComponent implements OnInit {
  //public title = 'todos los programas';

  constructor(
    private _route: Router
  ){}

  ngOnInit() {
  }

  public buscar(e:any){
    console.log("algun valor: ",e);
  }
}
