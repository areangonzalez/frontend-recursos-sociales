import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-vista-info-persona',
  templateUrl: './vista-info-persona.component.html',
  styleUrls: ['./vista-info-persona.component.sass']
})
export class VistaInfoPersonaComponent implements OnInit {
  @Input("persona") public persona:any;
  @Input("mostrarBoton") public mostrarBoton: boolean;

  ngOnInit() {
  }


}
