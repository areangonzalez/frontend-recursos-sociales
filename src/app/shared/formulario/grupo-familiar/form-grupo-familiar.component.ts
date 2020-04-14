import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/utils';
import { MensajesService } from 'src/app/core/services';

@Component({
  selector: 'shared-form-grupo-familiar',
  templateUrl: './form-grupo-familiar.component.html'
})
export class FormGrupoFamiliarComponent implements OnInit {
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter();
  @Output("cancelarModal") public cancelarModal = new EventEmitter();
  public grupoFamiliarForm: FormGroup;
  public submitted = false;

  constructor(private _fb: FormBuilder, private _util: UtilService, private _mensajeService: MensajesService){
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

  public cancelar(){
    this.cancelarModal.emit(true);
  }

  public validar(){
    this.submitted = true;
    if (this.grupoFamiliarForm.invalid) {
      this._mensajeService.cancelado("¡Error! Campos sin completar.", [{name:''}]);
      return;
    }else{
      this.obtenerDatos.emit({
        nro_documento: this.grupoFamiliarForm.get('nro_documento').value,
        apellido: this.grupoFamiliarForm.get('apellido').value,
        nombre: this.grupoFamiliarForm.get('nombre').value,
        fecha_nacimiento: this.grupoFamiliarForm.get('fecha_nacimiento').value,
      });
    }
  }

}
