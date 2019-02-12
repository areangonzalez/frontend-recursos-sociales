import { Component, OnInit, Input } from '@angular/core';
import { MensajesService } from 'src/app/core/services';

@Component({
  selector: 'shared-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.sass'],
})
export class ProgramaComponent implements OnInit {
  @Input("programa") public programa: object;

  constructor(
    private _mensajeService: MensajesService
  ){}

  ngOnInit() {

  }

  public contarRecursoSociales(programaid) {
    //this._recursoSocial
    console.log(programaid);
    return programaid;
  }

}
