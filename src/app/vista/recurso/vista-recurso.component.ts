import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecursoSocialService } from 'src/app/core/services';

@Component({
  selector: 'recurso-vista',
  templateUrl: './vista-recurso.component.html',
  styleUrls: ['./vista-recurso.component.sass']
})
export class VistaRecursoComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _recursoService: RecursoSocialService
  ){}

  ngOnInit() {
    // id del recurso (prestación)
    let recursoid = this._route.snapshot.paramMap.get('recursoid');

  }
}
