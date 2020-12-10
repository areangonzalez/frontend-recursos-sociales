import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-usuario-tabla',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})
export class UsuarioComponent implements OnInit {
  public page = 1;
  constructor() { }

  ngOnInit() {
  }

}
