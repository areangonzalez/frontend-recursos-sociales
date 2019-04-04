import { Component, OnInit } from '@angular/core';
import { ProgramaService, MensajesService, LoaderService } from '../core/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  //title = 'Reporte';
  public programaLista: any = [];

  constructor(
    private _mensajeService: MensajesService
  ){}

  ngOnInit() {
  }

}
