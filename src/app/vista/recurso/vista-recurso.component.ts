import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecursoSocialService } from 'src/app/core/services';

@Component({
  selector: 'recurso-vista',
  templateUrl: './vista-recurso.component.html',
  styleUrls: ['./vista-recurso.component.sass']
})
export class VistaRecursoComponent implements OnInit {

  public recurso = {
    "id": 36,
    "fecha_inicial": "2016-01-11",
    "fecha_alta": "2016-05-03",
    "monto": 14456,
    "observacion": "Observacion Fixture 36",
    "proposito": "Un proposito hecho con fixtures 36",
    "programaid": 2,
    "tipo_recursoid": 3,
    "personaid": 6,
    "programa": "Río Negro Presente",
    "tipo_recurso": "Mejora Habitacional"
};

  constructor(
    private _route: ActivatedRoute,
    private _recursoService: RecursoSocialService
  ){}

  ngOnInit() {
    // id del recurso (prestación)
    let recursoid = this._route.snapshot.paramMap.get('recursoid');

  }
}
