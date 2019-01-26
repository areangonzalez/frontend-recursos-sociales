import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'beneficiario-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: []
})
export class FormularioComponent implements OnInit {
  //title = 'Crear Beneficiario';
  public personaForm: FormGroup;

  public documento: string = '';

  constructor(
    private _fb: FormBuilder,
    private _router: Router
  ){
    this.personaForm = _fb.group({
      persona: _fb.group({
        id: 0,
        nro_documento: ['', Validators.required, Validators.minLength(7)],
        apellido: ['', Validators.required, Validators.minLength(3)],
        nombre: ['', Validators.required, Validators.minLength(3)],
        cuil: '',
        cuil_prin: ['', Validators.required, Validators.minLength(2)],
        cuil_fin: ['', Validators.required, Validators.minLength(2)],
        fecha_nacimiento: '',
        fechaNacimiento: ['', Validators.required],
        sexoid: ['', Validators.required],
        generoid: ['', Validators.required],
        estado_civilid: ['', Validators.required],
        contacto: _fb.group({
          telefono: '',
          celular: '',
          email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
          red_social: ''
        }),
        lugar: _fb.group({
          id: 0,
          localidadid: ['', Validators.required],
          calle: ['', [Validators.required, Validators.minLength(3)]],
          altura: ['', Validators.required],
          barrio: '',
          piso: '',
          depto: '',
          escalera: ''
        })
      }),
    });
  }

  ngOnInit() {
  }

  /**
   * @function cancelar cancelación del agregado/editado de un beneficiario
   */
  cancelar() {
    this._router.navigate(['inicio']);
  }

}
