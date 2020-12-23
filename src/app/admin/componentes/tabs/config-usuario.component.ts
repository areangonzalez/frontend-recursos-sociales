import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-config-usuario-tabs',
  templateUrl: './config-usuario.component.html',
  styleUrls: ['./config-usuario.component.sass']
})
export class ConfigUsuarioComponent implements OnInit {
  @Input("configListas") configListas: any;

  constructor() { }

  ngOnInit() {
  }

}
