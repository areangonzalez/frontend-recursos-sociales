import { Component, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Chart } from 'chart.js';
import { MensajesService, ProgramaService, LocalidadService } from 'src/app/core/services';

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
  public colorsGrafico: any[] = ['red', 'orange', 'yellow', 'green', 'blue'];
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

      this._localidadService.programasPorLocalidad(this.localidadId)
      .subscribe(datos => {
        this.localidadNombre = datos["nombre"];
        datos["programas"].forEach((val, i) => {
          //this.datosPrograma.push({ nombre: datos["programas"][i].nombre, color: this.colorsGrafico[i], beneficiarios: datos["programas"][i].beneficiarios });
          // nombre de programas
          this.chart.data.labels.push(datos["programas"][i].nombre);
          // cantidad de beneficiarios
          this.chart.data.datasets[0].data.push(datos["programas"][i].beneficiarios);
          console.log(this.chart.data);
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
