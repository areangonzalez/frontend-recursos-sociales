import { Component, OnInit, Input, EventEmitter, Output,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoRedSocialService, MensajesService } from 'src/app/core/services';
import { UtilService } from 'src/app/core/utils';

@Component({
  selector: 'shared-form-red-social',
  templateUrl: './form-red-social.component.html',
  styleUrls: ['./form-red-social.component.sass']
})
export class FormRedSocialComponent implements OnInit {
  @Output("getDatos") public getDatos = new EventEmitter(); // devuelve los datos de red social al listado
  @Output("cancelarModal") public cancelarModal = new EventEmitter(); // cancela y aplica el cierre del modal
  public redSocialForm: FormGroup; // formulario de red social
  public tipoRedSocialLista: any = []; // listado de tipos de red social
  public submitted: boolean = false; // variable auxiliar para mostrar errores del formulario

  constructor( private _fb: FormBuilder, private _mensajeService: MensajesService, private _tipoRedSocialService: TipoRedSocialService, private _util: UtilService ){
    // creo el objeto que contendra los parametros del formulario
    this.redSocialForm = _fb.group({
        tipo_red_socialid: ['', Validators.required],
        perfil: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.tipoRedSocial();
  }
  /**
   * lista los tipo de redes sociales
   */
  public tipoRedSocial() {
    this._tipoRedSocialService.listar().subscribe(
      datos => {
        console.log(datos);
        this.tipoRedSocialLista = datos;
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); }
    );
  }

  /**
   * Valido el formulario antes de guardar
   * @param recursoid identificador de la persona que ha sido guardada
   */
  public validar() {
    this.submitted = true;
    if (this.redSocialForm.invalid) {
      this._mensajeService.cancelado("¡Error! Campos sin completar.", [{name:''}]);
      return false;
    }else{
      this.guardar();
    }
  }

  /**
   * Verifico los datos antes de enviar el guardar al listado
   */
  public guardar() {

    let tiporedsocial = this.tipoRedSocialLista.filter(tipo => { return parseInt(tipo.id) === parseInt(this.redSocialForm.value.tipo_red_socialid); });
    let urlEncontrada = this.redSocialForm.value.perfil.search(tiporedsocial[0].nombre.toLowerCase());
    let perfilUsuario = (urlEncontrada != -1) ? this.redSocialForm.value.perfil : tiporedsocial[0].url_1 + this.redSocialForm.value.perfil;

    // envio los datos al modal
    this.getDatos.emit({
      "tipo_red_socialid": tiporedsocial[0].id,
      "tipo_red_social": tiporedsocial[0].nombre,
      "perfil": perfilUsuario,
      "icono_class": tiporedsocial[0].icono_class
    });
  }
  /**
   * Envia un booleano para el cierre del modal
   */
  public cancelar(){
    this.cancelarModal.emit(true);
  }
  /**
   * Valida el campo de perfil para que no tenga espacios
   * @param datos objeto que contiene la cadena ingresada.
   */
  public noEspacios(datos:any) {
    if (!this._util.validarEspacios(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }

}
