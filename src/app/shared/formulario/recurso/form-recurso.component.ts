import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';
import { TipoRecursoService, MensajesService, ProgramaService, PersonaService } from 'src/app/core/services';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'shared-form-recurso',
  templateUrl: './form-recurso.component.html',
  styleUrls: ['./form-recurso.component.sass']
})
export class FormRecursoComponent implements OnInit {
  @Input("listaPrograma") public listaPrograma: any;
  @Input("programaid") public programaid: any;
  @Input("personaid") public personaid: any;
  @Output("cancelar") public cancelar = new EventEmitter();
  @Output("obtenerDatos") public obtenerDatos = new EventEmitter();

  public formRecurso: FormGroup;
  public programaLista: any = [];
  public tipoPrestacionLista: any = [];
  public emprender: boolean = false;
  public listaAlumnos = [];
  public submitted = false;

  constructor(
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _tipoRecursoService: TipoRecursoService,
    private _mensajeService: MensajesService,
    private _programaService: ProgramaService,
    private _personaService: PersonaService,
    private _configNgbDate: NgbDatepickerConfig,

  ) {
    // configuro la fecha minima
    _configNgbDate.minDate = {year: 1950, month: 1, day: 1};
    // formulario de recurso
    this.formRecurso = _fb.group({
      programaid: ['', Validators.required],
      tipo_recursoid: ['', Validators.required],
      proposito: ['', Validators.required],
      fechaAlta: ['', Validators.required],
      fecha_alta: '',
      monto: ['', Validators.required],
      observacion: ''
    });
  }

  ngOnInit() {
    if (this.programaid) {
      let id: number = parseInt(this.programaid);
      // actualizo el listado de programas
      this.formRecurso.controls.programaid.patchValue(id);
      this.listarTipoPrestacion(id);
    }
  }

  get datosRecurso(){ return this.formRecurso.controls; }


  public formatFechaAlta(objFecha) {
    const fecha:string = this._utilService.formatearFecha(objFecha.day, objFecha.month, objFecha.year, 'yyyy-MM-dd');
    this.formRecurso.controls.fecha_alta.setValue(fecha);
  }

  public validadrNumero(datos){
    if (!this._utilService.validarNumero(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }

  public validarMoneda(moneda) {
    if (!this._utilService.validarMoneda(moneda.value)) {
      moneda.value = moneda.value.substring(0, moneda.value.length -1);
    }
  }

  /* public listarProgramas(){
    this._programaService.listar().subscribe(
      programas => {
        this.programaLista = programas;
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  } */

  public listarTipoPrestacion(programaid:number) {
    this.formRecurso.controls.tipo_recursoid.setValue('');
    this._tipoRecursoService.buscarPorPrograma(programaid).subscribe(
      prestacion => {
        this.tipoPrestacionLista = prestacion;
      }, error => this._mensajeService.cancelado(error, [{name:''}]));
  }

  public agregarAlumnos(alumno:any){
    if (this.personaid != undefined) {
      if ( alumno.id !== this.personaid ){
        if (this.alumnoDuplicado(alumno.id) === true){
          this.buscarPersonaPorId(alumno.id);
          //this.listaAlumnos.push(alumno.persona);
        }else{
          this._mensajeService.cancelado("Este alumno ya fue ingresado.", [{name: ''}]);
        }
      }else{
        this._mensajeService.cancelado("No puede ingresar al beneficiario como un alumno", [{name:''}]);
      }
    }else{
      this._mensajeService.cancelado("Por favor ingrese a un beneficiario.", [{name:''}]);
    }
  }

  private alumnoDuplicado(id:number) {
    let existe = true;
    if (this.listaAlumnos.length > 0){
      for (let i = 0; i < this.listaAlumnos.length; i++) {
        if (this.listaAlumnos[i].id == id) {
          existe = false;
        }
      }
    }
    return existe;

  }

  public borrarAlumno(alumno:any){
    for (let i = 0; i < this.listaAlumnos.length; i++) {
      if (this.listaAlumnos[i].id == alumno.id){
        this.listaAlumnos.splice(i, 1);
      }
    }
  }

  /* public buscarProgramaPorId(programaid:number){
    this._programaService.buscarPorId(programaid).subscribe(
      programa => {
        this.programaLista = [programa];
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  } */

  public buscarPersonaPorId(personaid:number){
    this._personaService.personaPorId(personaid).subscribe(
      persona => {
        this.listaAlumnos.push(persona);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }

  public cancelarForm(){
    this.cancelar.emit(true);
  }

  public validarForm(){
    this.submitted = true;

    if (this.formRecurso.invalid) {
      this._mensajeService.cancelado("Campos sin completar!! Por favor verifique el formulario.", [{name:''}]);
      return;
    }else{
      let recurso:object = this.formRecurso.value;
      let alumno: any[] = [];
      if (this.emprender){ // si es programa emprender
        if (this.listaAlumnos.length > 0){
          for (let i = 0; i < this.listaAlumnos.length; i++) {
            alumno.push({ alumnoid: this.listaAlumnos[i].id });
          }
          recurso["alumno_lista"] = alumno;
          this.obtenerDatos.emit(recurso);
        }else{
          this._mensajeService.cancelado('La lista de alumnos deberia de tener al menos una persona.', [{name:''}]);
          return;
        }
      }else{ // si no es programa emprender
        this.obtenerDatos.emit(this.formRecurso.value);
      }
    }
  }

  public esEmprender(event:any){
    // obtengo el nombre del programa
    let selectElementText = event.target['options'][event.target['options'].selectedIndex].text;
    this.emprender = (selectElementText.toLowerCase() === "emprender") ? true : false;
  }
}
