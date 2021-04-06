import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-vista-body-prestacion-general',
  templateUrl: './vista-body-prestacion-general.component.html',
  styleUrls: ['./vista-body-prestacion-general.component.sass']
})
export class VistaBodyPrestacionGeneralComponent implements OnInit {
  @Input("recurso") public recurso: any;
  constructor() { }

  ngOnInit() {
  }

}
