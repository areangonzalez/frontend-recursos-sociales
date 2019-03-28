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
            label: 'Prestaciones',
            data: [35, 10, 20, 10, 70],
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
            fill: false
          }
        ]      },
      options: {
        legend: {
          display: true
        }
      }
    });
  }
}