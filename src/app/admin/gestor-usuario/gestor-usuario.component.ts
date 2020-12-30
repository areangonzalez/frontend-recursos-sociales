import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admind-gestor-usuario',
  templateUrl: './gestor-usuario.component.html',
  styleUrls: ['./gestor-usuario.component.sass']
})
export class GestorUsuarioComponent implements OnInit {
  public listaUsuarios: any = [];

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.listaUsuarios = this._route.snapshot.data["usuarios"];
  }

}
