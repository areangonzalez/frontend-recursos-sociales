import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoSocialService, MensajesService, PersonaService } from 'src/app/core/services';

@Component({
  selector: 'recurso-vista',
  templateUrl: './vista-recurso.component.html',
  styleUrls: ['./vista-recurso.component.sass']
})
export class VistaRecursoComponent implements OnInit {
  public persona:any;
  public recurso:object;
  public recursoId: any;

  constructor(
    private _route: ActivatedRoute,
    private _recursoService: RecursoSocialService,
    private _mensajeService: MensajesService,
  ){}

  ngOnInit() {
    // id del recurso (prestación)
    let recursoid = (this._route.snapshot.paramMap.get('recursoid'));
    if(recursoid){
      this.recursoId = parseInt(recursoid);
      this.obtenerRecurso(this.recursoId);
    }else{

    }

  }

  public obtenerRecurso(recursoid:number){
    this._recursoService.recursoPorId(recursoid).subscribe(
      recurso => {
        this.recurso = recurso;
        this.persona = recurso.persona;
      }, error => { this._mensajeService.cancelado(error, [{name: ''}]); });
  }

  public actualizarRecurso(estado: any) {
    if(estado){
      this.obtenerRecurso(this.recursoId);
    }
  }

}
