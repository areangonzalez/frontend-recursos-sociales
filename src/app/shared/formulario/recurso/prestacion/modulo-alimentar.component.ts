import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';
import { TipoRecursoService, MensajesService, ProgramaService, PersonaService } from 'src/app/core/services';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'modulo-alimentar',
  templateUrl: './modulo-alimentar.component.html',
  /* styleUrls: ['./form-recurso.component.sass'] */
})
export class ModuloAlimentarComponent implements OnInit {


  constructor(){

  }

  ngOnInit(){

  }
}
