import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateARParserFormatter } from './shared';
import { TitleService, JwtService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter }]
})
export class AppComponent implements OnInit {
  public logueado: boolean = false;

  constructor(
    private _titleService: TitleService,
    private _auth: JwtService
  ){}

  ngOnInit() {
    this.estaLogueado();
    this._titleService.init();
  }

  public estaLogueado(){
    this.logueado = (this._auth.getToken()) ? true : false;
  }
}
