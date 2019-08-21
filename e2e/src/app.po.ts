import { browser, by, element } from 'protractor';

export class AppPage {
  irALogin() {
    return browser.get('/login');
  }

  irAInicio() {
    return browser.get('/inicio');
  }
}
