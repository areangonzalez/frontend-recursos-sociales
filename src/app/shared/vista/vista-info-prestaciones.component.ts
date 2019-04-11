import { Component, OnInit, Input } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'shared-vista-info-prestaciones',
  templateUrl: './vista-info-prestaciones.component.html',
  styleUrls: ['./vista-info-prestaciones.component.sass'],
  providers: [NgbTooltipConfig]
})
export class VistaInfoPrestacionesComponent implements OnInit {
  @Input("recursos") public recursos:any;

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
