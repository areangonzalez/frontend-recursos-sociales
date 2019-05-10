import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../core/services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  public programaLista: any = [];

  constructor(
    private _route: ActivatedRoute,
    private _load: LoaderService
  ){}

  ngOnInit() {
    this._load.hide();
    this.programaLista = this._route.snapshot.data["programas"];
  }
}
