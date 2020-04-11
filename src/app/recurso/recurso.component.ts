import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { MensajesService, PersonaService, RecursoSocialService, LoaderService } from '../core/services';
import { ModalConfig, BotonDisenio } from '../core/models';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.sass']
})
export class RecursoComponent implements OnInit {
  public infoPersona:boolean = false;
  public datosPersona:any = {};
  public contactosForm: FormGroup;
  public programaid: any;
  public configModal: ModalConfig = { title: "Editar beneficiario" };
  public configBotonModal: BotonDisenio = { class: 'btn btn-md btn-light btn-altura', iconoClass: 'fas fa-pencil-alt', text:'' };
  public programaLista: any;
  public tipoRecursoLista: any;
  public listaRedSocial: any = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _mensajeService: MensajesService,
    private _personaService: PersonaService,
    private _recursoService: RecursoSocialService
  ){
    this.contactosForm = _fb.group({
      contacto: _fb.group({
        telefono: '',
        celular: '',
        email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        red_social: ''
      })});
  }

  ngOnInit() {
    this.tipoRecursoLista = this._route.snapshot.data['tipoRecursos'];
    this.programaid = this._route.snapshot.paramMap.get('programaid');
    if (this.programaid){
      this.programaLista = [this._route.snapshot.data["programas"]];
    }else{
      this.programaLista = this._route.snapshot.data["programas"];
    }
  }
  /**
   * selecciono la persona del listado a traves de la busqueda
   * @param datos objeto que contiene los datos de la persona seleccionada
   */
  public seleccionarPersona(datos){
    if (datos.persona != undefined) {
      this.infoPersona = true;
      this.datosPersona = datos.persona;
      this.listaRedSocial = datos.persona.lista_red_social;
      this.contactosForm.controls.contacto.patchValue(datos.persona);
    }else if (datos.id != undefined) {
      this.personaEditada(datos.id);
    }
  }
  /**
   * limpia el formulario de persona y vuelve al listado de busqueda
   */
  public cambiarPersona(){
    this.datosPersona = {};
    this.infoPersona = false;
    this.contactosForm.reset();
  }
  /**
   * guarda una prestacion al completar el formulario
   * @param recurso datos de la prestacion
   */
  public guardar(recurso:object) {
    //console.log(this.datosPersona.id);
    if (this.datosPersona.id !== undefined ) {
      // agrego el id de persona
      recurso["personaid"] = this.datosPersona.id;
      recurso["monto"] = parseFloat(recurso["monto"]);
      recurso["localidadid"] = this.datosPersona.lugar.localidadid;
      let contacto: any = this.contactosForm.value.contacto;
      Object.assign(contacto, {lista_red_social: this.listaRedSocial});
      console.log(recurso);
      this._personaService.guardarContacto(contacto, this.datosPersona.id).subscribe(
        resultado =>{
          this.guardarRecurso(recurso);
        }, error => { this._mensajeService.cancelado(error, [{name: ''}]); });

    }else{
      this._mensajeService.cancelado("Disculpe, aun NO se ha seleccionado una persona.", [{name:''}]);
    }
  }
  /**
   * cancela el formulario de prestacion
   * @param cancela confirmacion de la cancelacion
   */
  public cancelar(cancela:boolean) {
    if(cancela) {
      this._router.navigate(['inicio']);
    }
  }
  /**
   * Guarda la prestacion
   * @param params datos de la prestacion
   */
  public guardarRecurso(params:object){
    this._recursoService.guardar(params, 0).subscribe(
      resultado => {
        this._mensajeService.confirmar("Se ha guardado correctamente la prestación", [{name: 'inicio/vista/prestacion', param:resultado["data"]["id"], tipo:'vista'}]);
      }, error => { this._mensajeService.cancelado(error, [{name: ''}]); });
  }
  /**
   * Obtiene los datos para editar a una persona
   * @param personaid identificador de la persona
   */
  public personaEditada(personaid){
    this.infoPersona = true;
    this._personaService.personaPorId(personaid).subscribe(
      datos => {
        this.datosPersona = datos;
        this.listaRedSocial = datos["lista_red_social"];
        this.contactosForm.controls.contacto.patchValue(datos);
      }, error => {
        this._mensajeService.cancelado(error, [{name:''}]);
      })
  }

}
