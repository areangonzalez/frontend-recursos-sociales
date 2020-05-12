import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ma-chart-cantidadad-modulo-alimentar',
  templateUrl: './chart-cantidad-modulo-alimentario.html',
})
export class ChartCantidadModuloAlimentarComponent implements OnInit {
  @Input("listadoLocalidadesMa") public listadoLocalidadesMa: any;
  public chart:any;
  public colorsGrafico = ['#FC4A1A', '#F7B733', '#4ABDAC', "#0375B4", "#007849", "#C0B283", "#E37222", "#4717F6", "#A239CA", "#CAEBF2", "#E9C893"];

  constructor(){}

  ngOnInit() {
    this.mostrarGrafico();
    this.configurarGrafico(this.listadoLocalidadesMa);
  }

  private configurarGrafico(listado: any) {
    console.log(listado);
    let datos: any = {labels: [], cantidad_modulos: []};
    for (let i = 0; i < listado.length; i++) {
      this.chart.data.labels.push(listado[i].localidad);
      this.chart.data.datasets[0].data.push(listado[i].modulo_cantidad);
        /* datos.labels.push(listado[i].localidad + " modulo: " + listado[i].modulo_cantidad);
        datos.cantidad_modulos.push(listado[i].modulo_cantidad); */
    }
    /* this.chart.data.labels = datos.labels;
    this.chart.data.datasets[0].data = datos.cantidad_modulos; */

    this.chart.update();
  }

  private mostrarGrafico(){
    this.chart = new Chart('cantidad-modulo', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: this.colorsGrafico,
            fill: false
          }
        ]
      },
      options: {
        tooltips: {
          mode: 'point'
        },
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



