import { Component, OnInit, Input } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'shared-vista-info-persona',
  templateUrl: './vista-info-persona.component.html',
  styleUrls: ['./vista-info-persona.component.sass'],
  providers: [NgbTooltipConfig]
})
export class VistaInfoPersonaComponent implements OnInit {
  @Input("persona") public persona:any;
  @Input("mostrarBoton") public mostrarBoton: boolean;

  constructor(
    configTooltip: NgbTooltipConfig
  ){
    configTooltip.placement = 'top';
    configTooltip.triggers = 'click';
  }

  ngOnInit() {
  }


}
