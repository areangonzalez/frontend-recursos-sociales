import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'ma-chart-cantidadad-modulo-alimentar',
  templateUrl: './chart-cantidad-modulo-alimentario.html',
})
export class ChartCantidadModuloAlimentarComponent implements OnInit {
  @Input("listadoLocalidadesMa") public listadoLocalidadesMa: any;
  public colorsGrafico = ['#FC4A1A', '#F7B733', '#4ABDAC', "#0375B4", "#007849", "#C0B283", "#E37222", "#4717F6", "#A239CA", "#CAEBF2", "#E9C893"];



  constructor(){}

  ngOnInit() {
    this.configurarGrafico(this.listadoLocalidadesMa);
  }

  private configurarGrafico(listado: any) {
    let chart = am4core.create("chardiv", am4charts.PieChart3D);
    // creo los labels del grafico
    chart.legend = new am4charts.Legend();
    // ingreso los datos
    chart.data = listado;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "modulo_cantidad";
    series.dataFields.category = "localidad";
  }

}



