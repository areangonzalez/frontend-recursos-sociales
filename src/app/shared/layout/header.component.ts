import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { IPrograma, IListaProgramas } from "../../core/models";
import { ProgramaService, MensajesService } from 'src/app/core/services';

@Component({
    selector: 'layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    public isCollapsed = true;
    public listaProgramas: IListaProgramas;
    public mostrar: boolean = false;

    constructor(
        private _router: Router,
        private _programaService: ProgramaService,
        private _mensajeService: MensajesService
    ) { }

    ngOnInit() {
      this.getProgramas();
    }

    estoyLogueado(){
      return true;
    }

    cerrarSesion(){
      console.log("cierre");
    }

    getProgramas(){
      this._programaService.listar().subscribe(
        datos => {
          this.listaProgramas = datos;
        }, error => { this._mensajeService.cancelado(error, [{name:''}] ); });
    }

    public isHovering = false;

    mouseHovering(index) {
        this.listaProgramas[index].isHovering = true;
    }
    mouseLeaving(index) {
      this.listaProgramas[index].isHovering = false;
    }

    mostrarMenu(){
      this.mostrar = !this.mostrar;
    }

    ocultarMenu(){
      this.mostrar = false;
    }

    public guardarPrograma(programa:Object) {
      this._programaService.setProgramaUrl(programa);
    }


}
