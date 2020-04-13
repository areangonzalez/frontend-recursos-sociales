import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';
import { TipoRecursoService, MensajesService, ProgramaService, PersonaService } from 'src/app/core/services';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'modulo-alimentar',
  templateUrl: './modulo-alimentar.component.html',
  /* styleUrls: ['./form-recurso.component.sass'] */
})
export class ModuloAlimentarComponent implements OnInit {
  @Input("prestacionModuloAlimentar") public prestacionModuloAlimentar: FormGroup;
  @Input("listaTipoResponsable") listaTipoResponsable: any;
  @Input("submitted") public submitted: boolean;
  public listaResponsableEntrega = [];
  public listaResponsableEntregaAux = [];

  constructor( private _utilService: UtilService, private _configNgbDate: NgbDatepickerConfig){
    // configuro la fecha minima
    _configNgbDate.minDate = {year: 1900, month: 1, day: 1};
  }

  ngOnInit(){
    this.listaResponsableEntregaAux = this.listaResponsableEntrega;
  }

  /**
   * Formateo la fecha de objeto a string
   * @param objFecha objeto fecha es ingresada como objeto
   */
  public formatFechaAlta(objFecha) {
    if (objFecha != null){
      const fecha:string = this._utilService.formatearFecha(objFecha.day, objFecha.month, objFecha.year, 'yyyy-MM-dd');
      this.prestacionModuloAlimentar.controls.fecha_alta.setValue(fecha);
    }else{
      this.prestacionModuloAlimentar.controls.fecha_alta.setValue('');
    }
  }
  /**
   * listo el tipo de responsables segun la seleccion
   * @param tipo_responsableid identificador del tipo de responsable
   */
  public listarResponsableEntrega(tipo_responsableid:any) {
    this.prestacionModuloAlimentar.controls.responsable_entregaid.setValue('');
    if (tipo_responsableid != ''){
      for (let i = 0; i < this.listaTipoResponsable.length; i++) {
        if (parseInt(tipo_responsableid) == this.listaTipoResponsable[i].id) {
          this.listaResponsableEntrega = this.listaTipoResponsable[i].lista_responsable;
        }
      }
    }else{
      this.listaResponsableEntrega = this.listaResponsableEntregaAux;
    }
  }
}
