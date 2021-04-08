import { Component } from '@angular/core';
import { MensajesService } from './../../core/services';

@Component({
  selector: 'shared-lista-cuota',
  templateUrl: './lista-cuota.component.html',
  styleUrls: ['./lista-cuota.component.sass']
})
export class ListaCuotaComponent {

  constructor(private _msj: MensajesService) { }

  borrarCuota(confirmacion: boolean, id: number) {
    if (confirmacion) {
      // servicio de borrado

      this._msj.exitoso("Se ha borrado la cuota!", [{name: ''}]);
    }
  }



}
