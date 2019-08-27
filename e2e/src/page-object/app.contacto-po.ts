import { browser, by, element } from 'protractor';

export class AppContactoPage {
  formContactoComp() {
    return element(by.tagName('shared-form-contacto'));
  }

  telefono() {
    return this.formContactoComp().element(by.id('telefono'));
  }
  celular() {
    return this.formContactoComp().element(by.id('celular'));
  }
  email() {
    return this.formContactoComp().element(by.id('email'));
  }
}
