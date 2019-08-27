import { browser, by, element } from 'protractor';

export class AppRecursoPage {
  formRecursoComp() {
    return element(by.tagName('shared-form-recurso'));
  }
  /**
   * programa
   * @var opcion [string] se requiere ingresar un elemento del listado
   */
  programa(opcion: string) {
    return this.formRecursoComp().element(by.id('programa')).element(by.cssContainingText('option', opcion)).click();
  }
  /**
   * tipo recurso/prestación
   * @var opcion [string] se requiere ingresar un elemento del listado
   */
  tipoRecurso(opcion: string) { // tipo prestación
    return this.formRecursoComp().element(by.id('tipo_recurso')).element(by.cssContainingText('option', opcion)).click();
  }
  /**
   * proposito de la prestación
   * dato [string] detalle del propósito
   */
  proposito(dato:string) {
    return this.formRecursoComp().element(by.id('proposito')).sendKeys(dato);
  }
  /**
   * Fecha de alta para la prestación
   * @param dato [string] fecha en formato dd/mm/yyyy Ej.: 10/05/2019
   */
  fechaAlta(dato:string) {
    return this.formRecursoComp().element(by.id('fecha_alta')).sendKeys(dato);
  }
  /**
   * monto que se le da a una prestación
   * @param dato [string] numero del monto
   */
  monto(dato:string) {
    return this.formRecursoComp().element(by.id('monto')).sendKeys(dato);
  }
  /**
   * observacion de la prestacion
   * @param dato [string] una breve descripcion.
   */
  observacion(dato:string) {
    return this.formRecursoComp().element(by.id('observacion')).sendKeys(dato);
  }

  listaAlumnosComp() {
    return this.formRecursoComp().element(by.tagName('shared-lista-persona'));
  }

  buscarPersonaComp() {
    return this.formRecursoComp().element(by.tagName('shared-buscar-persona'));
  }
}
