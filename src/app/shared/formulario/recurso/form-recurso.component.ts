import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from 'src/app/core/utils';
import { TipoRecursoService, ProgramaService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'shared-form-recurso',
  templateUrl: './form-recurso.component.html',
  styleUrls: ['./form-recurso.component.sass']
})
export class FormRecursoComponent implements OnInit {

  public formRecurso: FormGroup;
  public tipoPrestacionLista: any = [];
  public emprender: boolean = false;
  public programa:any;
  public listaAlumnos = [];
  public submitted = false;

  constructor(
    private _fb: FormBuilder,
    private _utilService: UtilService,
    private _programaService: ProgramaService,
    private _tipoRecursoService: TipoRecursoService,
    private _mensajeService: MensajesService
  ) {
    this.formRecurso = _fb.group({
      tipo_recurso_socialid: ['', Validators.required],
      proposito: ['', Validators.required],
      fechaAlta: ['', Validators.required],
      fecha_alta: '',
      monto: ['', Validators.required],
      observacion: ''
    });
  }

  ngOnInit() {
    this.getTipoPrestacion();


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

  public getTipoPrestacion() {
    this.programa = this._programaService.getProgramaUrl();
    this.emprender = (this.programa.id == 1) ? true : false;
    this._tipoRecursoService.buscarPorPrograma(this.programa.id).subscribe(
      prestacion => {
        this.tipoPrestacionLista = prestacion;
      }, error => console.log("hubo un error: ", error));
  }

  public agregarAlumnos(alumno:any){

    if (this.alumnoDuplicado(alumno.id) === true){
      this.listaAlumnos.push(alumno.persona);
    }else{
      this._mensajeService.cancelado("Este alumno ya fue ingresado.", [{name: ''}]);
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

  borrarAlumno(alumno:any){
    for (let i = 0; i < this.listaAlumnos.length; i++) {
      if (this.listaAlumnos[i].id == alumno.id){
        this.listaAlumnos.splice(i, 1);
      }
    }
  }
}
