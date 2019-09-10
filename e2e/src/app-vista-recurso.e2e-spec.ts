import { by, browser, element } from "protractor";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppLoginPage } from "./page-object/app.login-po";

describe('Componente Vista de un recurso',  () => {
  let login: AppLoginPage;
  let cabecera: AppCabeceraPage;
  // Inicio de session para realizar tareas de testing
  beforeAll(() => {
    login = new AppLoginPage();

    browser.get('/login');
    // Agrego un usuario valido
    login.nombreUsuario().sendKeys("admin");
    login.passUsuario().sendKeys("admins");

    let btnLogin = login.loginComp().element(by.id('ingresar-login'));

    btnLogin.click();

    browser.waitForAngular();
  });

  it('Componente info persona', () => {
    browser.get('/inicio/vista/prestacion/3');
    browser.waitForAngular();

    expect(element(by.tagName('shared-vista-info-persona')).isPresent());
  });

  it('Componente info recurso', () => {
    expect(element(by.tagName('shared-vista-info-recurso')).isPresent());
  });

  // Cierre de sesion al finalizar las tareas
  afterAll(() => {
    let cabecera = new AppCabeceraPage();

    cabecera.abrirMenu().click()
    browser.waitForAngular();
    cabecera.cerrarSesion().click();
    browser.waitForAngular();
  });

});
