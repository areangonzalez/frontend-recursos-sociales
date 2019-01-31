import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: []
})
export class BuscarPersonaComponent implements OnInit {
  //public title = 'todos los programas';

  constructor(
    private _route: Router
  ){}

  ngOnInit() {
  }

  public buscar(e:any){
    console.log("algun valor: ",e);
  }


  public seleccionarPersona(id){
    console.log(id);
  }
}
