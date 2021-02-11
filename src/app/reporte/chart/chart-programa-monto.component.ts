import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { MensajesService, DetalleProgramaService } from 'src/app/core/services';

@Component({
  selector: 'reporte-programa-monto',
  templateUrl: './chart-programa-monto.component.html'
})
export class ChartProgramaMontoComponent implements OnInit {

  public chart:any;

  constructor(
    private _mensajeService: MensajesService,
    private _detalleProgramaService: DetalleProgramaService
  ){


  }

  ngOnInit() {
    this.mostrarGrafico();
    this.obtenerDatosPrograma();
    this.chart.canvas.parentNode.style.height = '260px';
  }

  private obtenerDatosPrograma(){
    this._detalleProgramaService.info()
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
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItems, data) {
              for (let i = 0; i < data.datasets.length; i++) {
                for (let j = 0; j < data.datasets[i].data.length; j++) {
                  if (data.datasets[i].data[j] === tooltipItems.yLabel){
                    let formatoPeso = new Intl.NumberFormat('es-CO', {
                      style: 'currency', currency: 'COP'
                    });
                    return data.datasets[i].label + ": " + formatoPeso.format(parseFloat(tooltipItems.yLabel));
                  }
                }
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
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
