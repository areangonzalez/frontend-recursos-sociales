import { Component, OnInit, Input } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'shared-vista-info-recurso',
  templateUrl: './vista-info-recurso.component.html',
  styleUrls: ['./vista-info-recurso.component.sass'],
  providers: [NgbTooltipConfig]
})
export class VistaInfoRecursoComponent implements OnInit {
  @Input("recurso") public recurso:any;
  //@Input("mostrarBoton") public mostrarBoton: boolean;

  constructor(
    configTooltip: NgbTooltipConfig
  ){
    configTooltip.placement = 'top';
    configTooltip.triggers = 'hover';
  }

  ngOnInit() {
  }

  mostrarFA(estado:any){
    console.log(estado);
  }

  mostrarFB(estado:any){
    console.log(estado);
  }
}
