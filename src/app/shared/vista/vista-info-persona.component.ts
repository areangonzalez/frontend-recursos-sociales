import { Component, OnInit, Input } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig, BotonDisenio } from 'src/app/core/models';
import { PersonaService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'shared-vista-info-persona',
  templateUrl: './vista-info-persona.component.html',
  styleUrls: ['./vista-info-persona.component.sass'],
  providers: [NgbTooltipConfig]
})
export class VistaInfoPersonaComponent implements OnInit {
  @Input("persona") public persona:any;
  @Input("mostrarBoton") public mostrarBoton: boolean;

  public configModal: ModalConfig = { title: "Editar persona" };
  public configBotonModal: BotonDisenio = { class: 'btn btn-md btn-light mb-2', iconoClass: 'fas fa-pencil-alt', text:'' };

  constructor(
    configTooltip: NgbTooltipConfig,
    private _personaService: PersonaService,
    private _mensajeService: MensajesService
  ){
    configTooltip.placement = 'top';
    configTooltip.triggers = 'hover';
  }

  ngOnInit() {
  }

  personaEditada(personaid) {
    this._personaService.personaPorId(personaid).subscribe(
      datos => {
        this.persona = datos;
      }, error => { this._mensajeService.cancelado(error, [{name: ''}]) });
  }
}
