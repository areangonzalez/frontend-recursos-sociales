import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'shared-form-lugar',
  templateUrl: './form-lugar.component.html',
  styleUrls: ['./form-lugar.component.sass']
})
export class FormLugarComponent implements OnInit {
  @Input('formLugar') public lugar: FormGroup;

  public submitted: boolean = false;
  public localidadLista: any = [{id: 1, nombre: 'Roca'}, {id: 2, nombre: 'Viedma'}];

  constructor(){}

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get datosLugar() { return this.lugar.controls; }

}
