import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-vista-header',
  templateUrl: './vista-header.component.html',
  styleUrls: ['./vista-header.component.sass']
})
export class VistaHeaderComponent implements OnInit {
  @Input("recurso") public recurso: any;

  constructor() { }

  ngOnInit() {
  }

  public datosCuota(recurso: any) {
    let cuota: any = {};
    cuota["cuota"] = recurso.cuota;
    cuota["cant_cuota"] = parseInt(recurso.cant_cuota) + 1;
    cuota["monto_total"] = recurso.monto;
    cuota["monto_mensual"] = (parseFloat(recurso.monto_mensual) == 0) ? recurso.monto : recurso.monto_mensual;
    cuota["monto_total_acreditado"] = recurso.monto_total_acreditado;
    cuota["monto_resto"] = recurso.monto_resto;
    cuota["monto"] = (parseFloat(recurso.monto_resto) < parseFloat(recurso.monto_mensual)) ? recurso.monto_resto : recurso.monto_mensual;

    return cuota;
  }

}
