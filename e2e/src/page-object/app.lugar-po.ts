import { browser, by, element } from 'protractor';

export class AppLugarPage {
  formLugarComp() {
    return element(by.tagName('shared-form-lugar'));
  }
  /**
   * Localidad
   * @var opcion [string] se requiere ingresar un elemento del listado
   */
  localidad(opcion: string) {
    return this.formLugarComp().element(by.id('localidad')).element(by.cssContainingText('option', opcion)).click();
  }
  calle(dato:string) {
    return this.formLugarComp().element(by.id('calle')).sendKeys(dato);
  }
  altura(dato:string) {
    return this.formLugarComp().element(by.id('altura')).sendKeys(dato);
  }
  barrio(dato:string) {
    return this.formLugarComp().element(by.id('barrio')).sendKeys(dato);
  }
  escaleraModulo(dato:string) {
    return this.formLugarComp().element(by.id('escalera')).sendKeys(dato);
  }
  piso(dato:string) {
    return this.formLugarComp().element(by.id('piso')).sendKeys(dato);
  }
  departamento(dato:string) {
    return this.formLugarComp().element(by.id('departamento')).sendKeys(dato);
  }
}
