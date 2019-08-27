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
  abrirModalRedSocial() {
    return this.redSocialComp().element(by.tagName('modal-red-socail-component'));
  }
  /**
   * cierra el modal de red social
   */
  cerrarModalRedsocial() {

    return this.abrirModalRedSocial().element(by.tagName('button')).clik();
  }
  /**
   * formulario de red social
   * esta incluido dentro del modal
   */
  formRedSocialComp() {
    return this.abrirModalRedSocial().element(by.tagName('shared-form-red-social'));
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
    return this.formRedSocialComp().element(by.css('btn btn-success')).click();
  }
  /**
   * cancelar formulario de red social
   */
  cancelar() {
    return this.formRedSocialComp().element(by.css('btn btn-dager mr-1')).click();
  }
}
