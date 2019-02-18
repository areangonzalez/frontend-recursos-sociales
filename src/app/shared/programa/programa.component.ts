import { Component, OnInit, Input } from '@angular/core';
import { MensajesService, RecursoSocialService } from 'src/app/core/services';

@Component({
  selector: 'shared-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.sass'],
})
export class ProgramaComponent implements OnInit {
  @Input("programaId") public programaId: number;
  @Input("programaNombre") public programaNombre: string;

  public cantidadRecursos:number = 0;

  constructor(
    private _mensajeService: MensajesService,
    private _recursoSocialService: RecursoSocialService
  ){}

  ngOnInit() {
    this.contarRecursoSociales(this.programaId);
  }

  public contarRecursoSociales(programaid:number) {
    this._recursoSocialService.buscar({programaid: programaid, pagesize:0}).subscribe(
      recursos => {
        this.cantidadRecursos = recursos.total_filtrado;
      }, error => { this._mensajeService.cancelado(error, [{name: ''}]); });
  }

}
