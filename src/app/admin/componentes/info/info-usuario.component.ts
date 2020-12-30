import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.sass']
})
export class InfoUsuarioComponent implements OnInit {
  @Input("datosUsuario") public datosUsuario: any;

  constructor() {
  }

  ngOnInit() {
  }

}
