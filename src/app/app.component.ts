import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateARParserFormatter } from './shared';
import { TitleService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter }]
})
export class AppComponent implements OnInit {

  constructor(
    private _titleService: TitleService,
  ){}

  ngOnInit() {
    this._titleService.init();
  }

}
