import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'programa-tipo',
  templateUrl: './tipo-programa.component.html',
  styleUrls: ['./tipo-programa.component.sass']
})
export class TipoProgramaComponent implements OnInit {
  public programaid:any;

  constructor(private _route: ActivatedRoute){}

  ngOnInit() {
    this.programaid = this._route.snapshot.paramMap.get('id');
    console.log("tipo-programa-component: ",this.programaid);
  }
}
