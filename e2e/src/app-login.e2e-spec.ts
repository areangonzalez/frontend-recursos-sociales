import { AppPage } from './app.po';
import { by, element, browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Verifico si estoy en el login', () => {
    page.irALogin();
    let titulo = element(by.css('app-login h1')).getText();
    expect(titulo).toEqual('Gestor de Prestaciones');
  });

  it('Me logueo como usuario administrador', () => {
    let loginComp = element(by.css('app-login'));
    let usuarioNombre = loginComp.element(by.id('nombre_usuario')).sendKeys("admin");
    let usuarioPass = loginComp.element(by.id('pass_usuario')).sendKeys("admins");

    let btnLogin = loginComp.element(by.id('ingresar-login'));

    btnLogin.click();

    browser.waitForAngular();
    expect(element(by.tagName('app-inicio')).isPresent()).toBeTruthy();
  });


});
