import { Component, OnInit, Input } from '@angular/core';
import { MensajesService, RecursoSocialService, LoaderService } from 'src/app/core/services';

@Component({
  selector: 'shared-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.sass'],
})
export class ProgramaComponent implements OnInit {
  @Input("programa") public programa: any;

  constructor(
  ){}

  ngOnInit() {
  }
}
