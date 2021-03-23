import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'prestacion-general',
  templateUrl: './prestacion-general.component.html',
  /* styleUrls: ['./form-recurso.component.sass'] */
})
export class PrestacionGeneralComponent implements OnInit {
  @Input("prestacion") public prestacion: FormGroup;
  @Input("submitted") public submitted: boolean;

  constructor( private _utilService: UtilService, private _configNgbDate: NgbDatepickerConfig ){
    // configuro la fecha minima
    _configNgbDate.minDate = {year: 1900, month: 1, day: 1};
  }

  ngOnInit(){}

  /**
   * Formateo la fecha de objeto a string
   * @param objFecha objeto fecha es ingresada como objeto
   */
  public formatFecha(objFecha, clave: string) {
    if (objFecha != null){
      const fecha:string = this._utilService.formatearFecha(objFecha.day, objFecha.month, objFecha.year, 'yyyy-MM-dd');
      this.prestacion.controls[clave].setValue(fecha);
    }else{
      this.prestacion.controls[clave].setValue('');
    }
  }
  /**
   * valido que la moneda sea numero
   * @param moneda valor a verificar
   */
  public validarMoneda(moneda) {
    if (!this._utilService.validarMoneda(moneda.value)) {
      moneda.value = moneda.value.substring(0, moneda.value.length -1);
    }
  }

}
