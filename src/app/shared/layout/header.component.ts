import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { IPrograma, IListaProgramas } from "../../core/models";
import { ProgramaService } from 'src/app/core/services';

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
        private _programaService: ProgramaService
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
        }, error => { console.log("hubo un error: ",error); });

      /* this.listaProgramas = [
        { id: 1, nombre: 'Emprender', isHovering:false }, { id: 2, nombre: 'Habitat', isHovering:false },{ id: 3, nombre: 'Microemprendimientos', isHovering:false },
        { id: 4, nombre: 'RN Presente', isHovering:false }, { id: 5, nombre: 'Subsidio', isHovering:false }
      ]; */
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
