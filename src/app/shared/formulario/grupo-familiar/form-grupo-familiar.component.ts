import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'shared-form-grupo-familiar',
  templateUrl: './form-grupo-familiar.component.html'
})
export class FormGrupoFamiliarComponent implements OnInit {
  @Input("formGrupoFamiliar") public grupoFamiliar: FormGroup;
  @Input("submitted") public submitted: boolean;

  constructor(private _util: UtilService){}

  ngOnInit() {
  }

  public formatFechaNacimiento(obj:any){
    this.grupoFamiliar.controls.fecha_nacimiento.setValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
  }

}
