import { Component, OnInit } from '@angular/core';
import { ProgramaService } from 'src/app/core/services';

@Component({
  selector: 'shared-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.sass'],
})
export class ProgramaComponent implements OnInit {

  constructor(
    private _programaService: ProgramaService
  ){}

  ngOnInit() {
  }
}
