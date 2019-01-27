import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.sass']
})
export class ProgramaComponent implements OnInit {
  public title = 'todos los programas';

  ngOnInit() {
  }
}
