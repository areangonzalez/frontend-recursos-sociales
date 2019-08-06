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
    // remuevo los datos
    this.removeDataGrafico();

    this._estadisticaService.montosLocalidades(rango)
    .subscribe(localidad => {
      localidad.forEach((val, i) => {
        // nombre de programas
        this.chart.data.labels.push(localidad[i].nombre);
        // monto acreditado
        this.chart.data.datasets[0].data.push(localidad[i].monto_acreditado);
        // monto baja
        this.chart.data.datasets[1].data.push(localidad[i].monto_baja);
        // monto sin acreditar
        this.chart.data.datasets[2].data.push(localidad[i].monto_sin_acreditar);
        //actualizo el grafico
        this.chart.update();
      });
    }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
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
            label: 'Baja',
            data: [],
            backgroundColor: 'red',
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
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            barPercentage: 0.5,
            stacked: false,
            /* gridLines: {
                offsetGridLines: true
            } */
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
    console.log("borrado:", this.chart.data.labels);
    this.chart.update();
  }
}
