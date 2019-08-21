import { browser, by, element } from 'protractor';

export class AppLoginPage {
  loginComp() {
    return element(by.tagName('app-login'));
  }

  nombreUsuario() {
    return this.loginComp().element(by.id('nombre_usuario'));
  }
  passUsuario() {
    return this.loginComp().element(by.id('pass_usuario'));
  }
}
