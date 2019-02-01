import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'programa-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.sass']
})
export class CrearRecursoComponent implements OnInit {
  public infoPersona = false;
  public datosPersona:any = {};

  ngOnInit() {
  }

  public seleccionarPersona(datos){
    console.log(datos);
    if (datos.persona != undefined) {
      this.infoPersona = true;
      this.datosPersona = datos.persona;
    }
  }

  public cambiarPersona(){
    this.datosPersona = {};
    this.infoPersona = false;
  }

}
