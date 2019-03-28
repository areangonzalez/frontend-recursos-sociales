import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { MensajesService, ProgramaService } from 'src/app/core/services';

@Component({
  selector: 'reporte-programa-monto',
  templateUrl: './chart-programa-monto.component.html'
})
export class ChartProgramaMontoComponent implements OnInit {

  public chart:any;

  constructor(
    private _mensajeService: MensajesService,
    private _programaService: ProgramaService
  ){

  }

  ngOnInit() {
    this.mostrarGrafico();
    this.obtenerDatosPrograma();
  }

  private obtenerDatosPrograma(){
    this._programaService.listar()
    .subscribe(programa => {

      programa.forEach((val, i) => {
        this.chart.data.labels.push(programa[i].nombre);
        // baja
        this.chart.data.datasets[0].data.push(programa[i].monto_baja);
        // acreditado
        this.chart.data.datasets[1].data.push(programa[i].monto_acreditado);
        // sin acreditar
        this.chart.data.datasets[2].data.push(programa[i].monto_sin_acreditar);
        this.chart.update();
      });
    }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  private mostrarGrafico(){
    this.chart = new Chart('programa-monto', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Baja',
            data: [],
            backgroundColor: 'red',
            fill: false
          },
          {
            label: 'Acreditado',
            data: [],
            backgroundColor: 'green',
            fill: false
          },
          {
            label: 'Sin acreditar',
            data: [],
            backgroundColor: 'gray',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            barPercentage: 0.5,
            stacked: true,
            gridLines: {
                offsetGridLines: true
            }
          }],
          yAxes: [{
            stacked: true,
            display: true
          }],
        }
      }
    });
  }


}
