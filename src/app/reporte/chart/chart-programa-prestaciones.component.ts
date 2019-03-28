import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'reporte-programa-prestaciones',
  templateUrl: './chart-programa-prestaciones.component.html',
  // styleUrls: ['./reporte.component.sass'],
})
export class ChartProgramaPrestacionesComponent implements OnInit {

  public chart:any;
  public pieChartLabels = ['Emprender', 'Habitat', 'Micro Emprenimientos', 'Río negro presente', 'subsidio'];
  public pieChartData = [120, 150, 180, 90, 30];
  public pieChartType = 'pie';

  constructor(){}

  ngOnInit() {
    this.chart = new Chart('programa-prestaciones', {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [
          {
            label: 'Baja',
            data: [0, 10, 20, 0, 0],
            backgroundColor: 'red',
            fill: false
          },
          {
            label: 'Acreditado',
            data: [20, 50, 80, 10, 5],
            backgroundColor: 'green',
            fill: false
          },
          {
            label: 'general',
            data: this.pieChartData,
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
            //barPercentage: 0.5,
            stacked: true,
            //barThickness: 6,
            //maxBarThickness: 8,
            //minBarLength: 31,
            gridLines: {
                offsetGridLines: true
            }
          }],
          yAxes: [{
            //stacked: true,
            display: true
          }],
        }
      }
    });
  }
}
