import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MensajesService, EstadisticaService } from 'src/app/core/services';

@Component({
  selector: 'reporte-localidad-monto',
  templateUrl: './chart-localidad-monto.component.html'
})
export class ChartLocalidadMontoComponent implements OnInit {

  public chart:any;
  public colorsGrafico: any[] = ['red','green', 'gray'];
  public datosLocalidad: any[] = [];
  public rango: number = 5;
  public mostrarError: boolean = false;

  constructor(
    private _mensajeService: MensajesService,
    private _estadisticaService: EstadisticaService
  ){}

  ngOnInit() {
    this.mostrarGrafico();
    this.obtenerDatosPrograma(5);
    this.chart.canvas.parentNode.style.height = '460px';
  }

  public obtenerDatosPrograma(rango:number){
    if (rango < 2 || rango > 10 ) {
      this.mostrarError = true;
    }else{
      this.mostrarError = false;
      // remuevo los datos
      this.removeDataGrafico();

      this._estadisticaService.montosLocalidades(rango)
      .subscribe(localidad => {
        localidad.forEach((val, i) => {
          // nombre de programas
          this.chart.data.labels.push(localidad[i].localidad);
          // monto acreditado
          this.chart.data.datasets[0].data.push(localidad[i].monto_acreditado);
          // monto sin acreditar
          this.chart.data.datasets[1].data.push(localidad[i].monto_sin_acreditar);
          //actualizo el grafico
          this.chart.update();
        });
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }
  }

  private mostrarGrafico(){
    this.chart = new Chart('localidad-monto', {
      type: 'horizontalBar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Acreditado',
            data: [],
            backgroundColor: 'green',
            // fill: false
          },
          {
            label: 'Sin acreditar',
            data: [],
            backgroundColor: 'gray',
            // fill: false
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
                  if (data.datasets[i].data[j] === tooltipItems.xLabel){
                    let formatoPeso = new Intl.NumberFormat('es-CO', {
                      style: 'currency', currency: 'COP'
                    });
                    return data.datasets[i].label + ": " + formatoPeso.format(parseFloat(tooltipItems.xLabel));
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
            stacked: false,
          }],
          yAxes: [{
            stacked: false,
            display: true
          }],
        }
      }
    });
  }

  private removeDataGrafico() {
    this.chart.data.labels = [];
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
    this.chart.update();
  }
}
