import { Component, Input } from '@angular/core';
import { MensajesService, CuotaService } from './../../core/services';

@Component({
  selector: 'shared-lista-cuota',
  templateUrl: './lista-cuota.component.html',
  styleUrls: ['./lista-cuota.component.sass']
})
export class ListaCuotaComponent {
  @Input("cuotaLista") public cuotaLista: any;
  @Input("montoTotal") public montoTotal: any;
  @Input("montoAcreditado") public montoAcreditado: any;
  @Input("recursoid") public recursoid: number;

  constructor(private _msj: MensajesService, private _cuotaService: CuotaService) { }
  /**
   * Borra la cuota si el aun tiene el limite de borrado por fecha
   * @param confirmacion booleano que habilita el borrado
   * @param id identificador de la cuota a borrar
   */
  borrarCuota(confirmacion: boolean, id: number) {
    if (confirmacion) {
      this._cuotaService.borrar(id).subscribe(
        respuesta => {
          this.listarCuotas(this.recursoid);
          this._msj.exitoso("Se ha borrado la cuota!", [{name: ''}]);
        }, error => { this._msj.cancelado(error, [{name:''}]); })
    }
  }

  public listarCuotas(recursoid:number) {
    this._cuotaService.listar(recursoid).subscribe(
      resultado => {
        this.cuotaLista = resultado;
      }, error => { this._msj.cancelado(error, [{name:''}]); });
  }



}
