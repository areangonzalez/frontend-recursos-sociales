import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoSocialService, MensajesService, PersonaService } from 'src/app/core/services';

@Component({
  selector: 'recurso-vista',
  templateUrl: './vista-recurso.component.html',
  styleUrls: ['./vista-recurso.component.sass']
})
export class VistaRecursoComponent implements OnInit {
  public persona:object;
  public recurso:object;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recursoService: RecursoSocialService,
    private _mensajeService: MensajesService,
    private _personaService: PersonaService

  ){}

  ngOnInit() {
    // id del recurso (prestación)
    let recursoid = this._route.snapshot.paramMap.get('recursoid');
    if(recursoid){
      this.obtenerRecurso(parseInt(recursoid));
    }else{

    }

  }

  public obtenerRecurso(recursoid:number){
    this._recursoService.recursoPorId(recursoid).subscribe(
      recurso => {
        this.recurso = recurso;
        console.log(this.recurso);
        this.obtenerPersona(recurso["personaid"]);
      }, error => { this._mensajeService.cancelado(error, [{name: ''}]); });
  }

  public obtenerPersona(personaid:number) {
    this._personaService.personaPorId(personaid).subscribe(
      persona => {
        console.log(persona);
        this.persona = persona;

      }, error => { this._mensajeService.cancelado(error, [{name: ''}]) })
  }
}
