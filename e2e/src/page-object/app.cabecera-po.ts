import { browser, by, element } from 'protractor';

export class AppCabeceraPage {
  cabeceraComp() {
    return element(by.tagName('layout-header'));
  }

  abrirMenu() {
    return this.cabeceraComp().element(by.id('dropdownBasic1'));
  }

  cerrarSesion() {
    return this.cabeceraComp().element(by.css('.dropdown-item'));
  }
}
