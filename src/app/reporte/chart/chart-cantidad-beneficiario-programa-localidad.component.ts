import { Component, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Chart } from 'chart.js';
import { MensajesService, ProgramaService } from 'src/app/core/services';

export interface myinterface {
    remove(index: number);
}

@Component({
  selector: 'reporte-cantidad-beneficiario-programa-localidad',
  templateUrl: './chart-cantidad-beneficiario-programa-localidad.component.html',
})
export class ChartBeneficiarioProgramaLocalidadComponent implements AfterViewInit{

  public index: number;
  public selfRef: ChartBeneficiarioProgramaLocalidadComponent;
  //interface for Parent-Child interaction
  public compInteraction: myinterface;
  public idCanvas: string;
  public chart:any;

  constructor(
    private _mensajeService: MensajesService,
    private _programaService: ProgramaService,
    private _cdRef: ChangeDetectorRef
  ){


  }

  ngAfterViewInit() {
    this.mostrarGrafico();
    this.obtenerDatosPrograma();
  }

  ngAfterViewChecked() {
    this.chart.canvas.parentNode.style.height = '260px';
    this._cdRef.detectChanges();
  }

  private obtenerDatosPrograma(){
    this._programaService.listar()
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
    this.chart = new Chart(this.idCanvas, {
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

  removeMe(index) {
    this.compInteraction.remove(index)
  }

}
