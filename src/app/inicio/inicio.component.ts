import { Component, OnInit } from '@angular/core';
import { ProgramaService, MensajesService } from '../core/services';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  //title = 'Reporte';
  public programaLista: any = [];

  constructor(
    private _programaService: ProgramaService,
    private _mensajeService: MensajesService
  ){}

  ngOnInit() {
    this.listarProgramas();
  }


  private listarProgramas() {
    this._programaService.listar().subscribe(
      programas => {
        this.programaLista = programas;
      }, error => { this._mensajeService.cancelado(error, [{name: ''}]); });
  }
}
