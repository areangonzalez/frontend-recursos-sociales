import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'reporte-programa-beneficiarios',
  templateUrl: './chart-programa-beneficiarios.component.html',
})
export class ChartProgramaBeneficiariosComponent implements OnInit {

  public chart:any;
  public pieChartLabels = ['Emprender', 'Habitat', 'Micro Emprenimientos', 'Río negro presente', 'subsidio'];
  public pieChartData = [120, 150, 180, 90, 30];
  public pieChartType = 'pie';

  constructor(){}

  ngOnInit() {
    this.chart = new Chart('programa-beneficiarios', {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [
          {
            label: 'Beneficiarios',
            data: [45, 50, 20, 5, 180],
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
