import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-vista-header',
  templateUrl: './vista-header.component.html',
  styleUrls: ['./vista-header.component.sass']
})
export class VistaHeaderComponent implements OnInit {
  @Input("recurso") public recurso: any;

  constructor() { }

  ngOnInit() {
  }

}
