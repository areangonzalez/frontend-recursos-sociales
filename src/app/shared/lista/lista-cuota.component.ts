import { Component, Input } from '@angular/core';
import { MensajesService, CuotaService } from './../../core/services';

@Component({
  selector: 'shared-lista-cuota',
  templateUrl: './lista-cuota.component.html',
  styleUrls: ['./lista-cuota.component.sass']
})
export class ListaCuotaComponent {
  @Input("cuotaLista") public cuotaLista: any;

  constructor(private _msj: MensajesService, private _cuotaService: CuotaService) { }

  borrarCuota(confirmacion: boolean, id: number) {
    if (confirmacion) {
      this._cuotaService.borrar(id).subscribe(
        respuesta => {
          this._msj.exitoso("Se ha borrado la cuota!", [{name: ''}]);
        }, error => { this._msj.cancelado(error, [{name:''}]); })
    }
  }





}
