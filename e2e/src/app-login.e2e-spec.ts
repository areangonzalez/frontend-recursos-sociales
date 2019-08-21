import { AppPage } from './page-object/app.po';
import { AppLoginPage } from './page-object/app.login-po';
import { by, element, browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let login: AppLoginPage;

  beforeEach(() => {
    page = new AppPage();
    login = new AppLoginPage();
  });

  it('Verifico si estoy en el login', () => {
    page.irALogin();
    let titulo = element(by.css('app-login h1')).getText();
    expect(titulo).toEqual('Gestor de Prestaciones');
  });

  it('Verifico mensaje de error en login', () => {
    login.nombreUsuario().sendKeys("usuario");
    login.passUsuario().sendKeys("contrasenia");

    let btnLogin = login.loginComp().element(by.id('ingresar-login'));

    btnLogin.click();

    browser.waitForAngular();

    expect(login.loginComp().element(by.id('login-mensaje')).getText()).toEqual("Por favor verifique sus datos.");
  });

  it('Me logueo como usuario administrador', () => {
    // limpio los inputs
    login.nombreUsuario().clear();
    login.passUsuario().clear();
    // Agrego un usuario valido
    login.nombreUsuario().sendKeys("admin");
    login.passUsuario().sendKeys("admins");

    let btnLogin = login.loginComp().element(by.id('ingresar-login'));

    btnLogin.click();

    browser.waitForAngular();
    expect(element(by.tagName('app-inicio')).isPresent()).toBeTruthy();
  });
});
