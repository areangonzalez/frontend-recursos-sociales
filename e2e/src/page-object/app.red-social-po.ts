import { browser, by, element } from 'protractor';

export class AppRedSocialPage {
  /**
   * componente del listado de redes sociales
   */
  redSocialComp() {
    return element(by.tagName('shared-lista-red-social'));
  }
  // borrar una red social sin funcionalidad
  borrarRedSocial() {
   // return
  }

  /**
   * boton agregar a modal de red social
   */
  modalRedSocial() {
    return element(by.tagName('modal-red-social-component'));
  }
  /**
   * cierra el modal de red social
   */
  cerrarModalRedsocial() {

    return element(by.tagName('modal-red-social-content')).element(by.tagName('button')).clik();
  }
  /**
   * formulario de red social
   * esta incluido dentro del modal
   */
  formRedSocialComp() {
    return element(by.tagName('shared-form-red-social'));
  }
  /**
   * Selector de tipo de red social
   * @var opcion [string] opcion del listado
   */
  tipoRedSocial(opcion: string) {
    return this.formRedSocialComp().element(by.id('tipo_red_social')).element(by.cssContainingText('option', opcion)).click();
  }
  /**
   * URL o nombre de perfil
   */
  perfil(dato:string) {
    return this.formRedSocialComp().element(by.id('perfil')).sendKeys(dato);
  }
  /**
   * agregar red social a partir del formulario
   */
  agregar() {
    return this.formRedSocialComp().element(by.css('div.float-right')).element(by.css('button.btn-success')).click();
  }
  /**
   * cancelar formulario de red social
   */
  cancelar() {
    return this.formRedSocialComp().element(by.css('div.float-right')).element(by.css('button.btn-dager')).click();
  }
}
