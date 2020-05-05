import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ma-chart-cantidadad-modulo-alimentar',
  templateUrl: './chart-cantidad-modulo-alimentario.html',
})
export class ChartCantidadModuloAlimentarComponent implements OnInit {
  public chart:any;
  public colorsGrafico = ['#FC4A1A', '#F7B733', '#4ABDAC', "#0375B4", "#007849", "#C0B283", "#E37222", "#4717F6", "#A239CA", "#CAEBF2", "#E9C893"];

  constructor(){}

  ngOnInit() {
    this.mostrarGrafico();
  }

  private mostrarGrafico(){
    this.chart = new Chart('cantidad-modulo', {
      type: 'pie',
      data: {
        labels: [
          "Allen",
          "Catriel",
          "Cipolletti",
          "Cinco Saltos"
        ],
        datasets: [
          {
            data: [30, 34, 45, 24],
            backgroundColor: this.colorsGrafico,
            fill: false
          }
        ]
      },
      options: {
        animation: {
          duration: 500,
          easing: "easeOutQuart"
        },
        responsive: true,
        legend: {
          display: true,
          position: 'left'
        },
      }
    });

  }

}



