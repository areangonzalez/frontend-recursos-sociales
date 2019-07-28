import { Component, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Chart } from 'chart.js';
import { MensajesService, LocalidadService } from 'src/app/core/services';

export interface myinterfaces {
    remove(index: number);
}

@Component({
  selector: 'reporte-cantidad-beneficiario-tipo-prestacion-localidad',
  templateUrl: './chart-cantidad-beneficiario-tipo-prestacion-localidad.component.html',
})
export class ChartBeneficiarioTipoPrestacionLocalidadComponent implements AfterViewInit{

  public index: number;
  public selfRef: ChartBeneficiarioTipoPrestacionLocalidadComponent;
  //interface for Parent-Child interaction
  public compInteraction: myinterfaces;
  public idCanvas: string;
  public chart:any;
  public colorsGrafico: any[];
  public datosPrograma: any[] = [];
  public localidadId:number = 0;
  public localidadNombre: string = '';

  constructor(
    private _mensajeService: MensajesService,
    private _localidadService: LocalidadService,
    private _cdRef: ChangeDetectorRef
  ){


  }

  ngAfterViewInit() {
    this.mostrarGrafico();
    this.obtenerDatosPrograma();
  }

  ngAfterViewChecked() {
    this.chart.canvas.parentNode.style.height = '160px';
    this._cdRef.detectChanges();
  }

  private obtenerDatosPrograma(){
    if (this.localidadId != 0){

      this._localidadService.TipoPrestacionPorLocalidad(this.localidadId)
      .subscribe(datos => {
        console.log(this.colorsGrafico);
        this.localidadNombre = datos["nombre"];
        datos["tipo_prestacion"].forEach((val, i) => {
          // nombre de programas
          this.chart.data.labels.push(datos["tipo_prestacion"][i].nombre);
          // cantidad de beneficiarios
          this.chart.data.datasets[0].data.push(datos["tipo_prestacion"][i].beneficiarios);
          this.chart.update();
        });
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
    }else{
      this._mensajeService.cancelado("Error, no se ha seleccionado ninguna localidad", [{name:''}]);
    }
  }

  private mostrarGrafico(){
    this.chart = new Chart(this.idCanvas, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Beneficiarios',
            data: [],
            backgroundColor: this.colorsGrafico,
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  removeMe(index) {
    this.compInteraction.remove(index)
  }

}
