import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'beneficiario-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: []
})
export class FormularioComponent implements OnInit {
  //title = 'Crear Beneficiario';
  constructor(
    private _router: Router
  ){}

  ngOnInit() {
  }

  /**
   * @function cancelar cancelación del agregado/editado de un beneficiario
   */
  cancelar() {
    this._router.navigate(['inicio']);
  }

}
