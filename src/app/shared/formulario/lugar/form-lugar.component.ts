import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MensajesService, LocalidadService } from 'src/app/core/services';

@Component({
  selector: 'shared-form-lugar',
  templateUrl: './form-lugar.component.html',
  styleUrls: ['./form-lugar.component.sass']
})
export class FormLugarComponent implements OnInit {
  @Input('formLugar') public lugar: FormGroup;

  public submitted: boolean = false;
  public localidadLista: any = [];

  constructor(private _mensajeService: MensajesService, private _localidadService: LocalidadService){}

  ngOnInit() {
    this.listarLocalidades();
  }

  // convenience getter for easy access to form fields
  get datosLugar() { return this.lugar.controls; }


  /* Funcionalidad para los listados del formulario */

  public listarLocalidades() {
    this._localidadService.listar().subscribe(
      datos => {
        this.localidadLista = datos;
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

}
