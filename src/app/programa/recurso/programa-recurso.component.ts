import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from "rxjs/operators";
import { ProgramaService } from 'src/app/core/services';

@Component({
  selector: 'programa-recurso',
  templateUrl: './programa-recurso.component.html',
  styleUrls: []
})
export class ProgramaRecursoComponent implements OnInit {
  public infoPersona:boolean = false;
  public datosPersona:any = {};
  public contactosForm: FormGroup;
  public programa: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _programService: ProgramaService
  ){
    this.contactosForm = _fb.group({
      contacto: _fb.group({
        telefono: '',
        celular: '',
        email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        red_social: ''
      })});
  }

  ngOnInit() {
  }

  public seleccionarPersona(datos){
    if (datos.persona != undefined) {
      this.infoPersona = true;
      this.datosPersona = datos.persona;
      this.contactosForm.controls.contacto.patchValue(datos.persona);
    }
  }

  public cambiarPersona(){
    this.datosPersona = {};
    this.infoPersona = false;
    this.contactosForm.reset();
  }

  public editarPersona(){
    const url: string = this._router.url;
    const urlModificada: string = url.replace('nuevo', 'crear-persona');
    this._router.navigateByUrl(urlModificada);
  }
}
