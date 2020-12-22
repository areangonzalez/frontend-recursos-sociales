import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-config-usuario-tabs',
  templateUrl: './config-usuario.component.html',
  styleUrls: ['./config-usuario.component.sass']
})
export class ConfigUsuarioComponent implements OnInit {

  public listaRoles: any = [
    { id: 1, nombre: 'admin' }, { id: 2, nombre: 'soporte' }, { id: 3, nombre: 'usuario_general' }, { id: 4, nombre: 'usuario_emprender' },
    { id: 5, nombre: 'usuario_habirat' }, { id: 6, nombre: 'usuario_micro_emprendimiento' }, { id: 7, nombre: 'usuario_modulo_alimenticio' },
    { id: 8, nombre: 'usuario_rio_negro_presente' }, { id: 9, nombre: 'usuario_subsidio' }];
  public listaPermisos: any = [
    {id: 1, nombre: "prestacion_crear" },{id: 2, nombre: "prestacion_modificar" },{id: 3, nombre: "prestacion_baja" },{id: 4, nombre: "prestacion_acreditar" },
    {id: 5, nombre: "prestacion_ver" },{id: 6, nombre: "persona_crear" },{id: 7, nombre: "persona_baja" },{id: 8, nombre: "persona_modificar" },
    {id: 9, nombre: "persona_ver" }];

  constructor() { }

  ngOnInit() {
  }

}
