import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MensajesService, ProgramaService } from 'src/app/core/services';

@Component({
  selector: 'reporte-programa-monto',
  templateUrl: './chart-programa-monto.component.html',
  // styleUrls: ['./reporte.component.sass'],
})
export class ChartProgramaMontoComponent implements OnInit {

  public chart:any;
  /* public nombreProgramas = ['Emprender', 'Habitat', 'Micro Emprenimientos', 'Río negro presente', 'subsidio'];
  public montoBaja = [];
  public montoAcreditado = [];
  public montoSinAcreditar = []; */
  /* public pieChartType = 'pie'; */

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
    /* .pipe(map(vPrograma => {
      let vDatos = [];

      this.chart.data.labels.push(vPrograma)

    })) */
    .subscribe(programa => {
      console.log(programa);
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
