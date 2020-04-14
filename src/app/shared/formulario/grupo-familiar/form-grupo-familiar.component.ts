import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'shared-form-grupo-familiar',
  templateUrl: './form-grupo-familiar.component.html'
})
export class FormGrupoFamiliarComponent implements OnInit {
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter
  public grupoFamiliarForm: FormGroup;
  public submitted = false;

  constructor(private _fb: FormBuilder, private _util: UtilService){
    this.grupoFamiliarForm = _fb.group({
      nro_documento: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fecha_nacimiento: ''
    });
  }

  ngOnInit() {
  }

  public formatFechaNacimiento(obj:any){
    this.grupoFamiliarForm.get('fecha_nacimiento').setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
  }

}
