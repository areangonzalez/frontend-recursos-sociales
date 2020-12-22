import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.sass']
})
export class InfoUsuarioComponent implements OnInit {

  public datosPersona: any;

  constructor() {
    this.datosPersona = {
      nro_documento: "33476725", cuil: "20334767257", nombre: "Arean", apellido: "Gonzalez",
      user_name: "agonzalez", email: "agonzalez@desarrollohumano.rionegro.gov.ar", password: ""
    }
  }

  ngOnInit() {
  }

}
