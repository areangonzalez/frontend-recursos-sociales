import { Component, OnInit, Input, EventEmitter, Output,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoRedSocialService, MensajesService } from 'src/app/core/services';

@Component({
  selector: 'shared-form-red-social',
  templateUrl: './form-red-social.component.html',
  styleUrls: ['./form-red-social.component.sass']
})
export class FormRedSocialComponent implements OnInit {
  @Output("getDatos") public getDatos = new EventEmitter();
  @Output("cancelarModal") public cancelarModal = new EventEmitter();
  public redSocialForm: FormGroup;
  public tipoRedSocialLista: any = [];
  public submitted: boolean = false;

  constructor( private _fb: FormBuilder, private _mensajeService: MensajesService, private _tipoRedSocialService: TipoRedSocialService ){
    this.redSocialForm = _fb.group({
        tipo_red_socialid: ['', Validators.required],
        perfil: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.tipoRedSocial();
  }

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
      "icon_class": tiporedsocial[0].icon_class
    });
  }

  public cancelar(){
    this.cancelarModal.emit(true);
  }

}
