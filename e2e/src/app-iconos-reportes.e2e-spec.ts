import { by, browser, element } from "protractor";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppLoginPage } from "./page-object/app.login-po";
import { AppReportePage } from "./page-object/app.busqueda-avanzada-po";

describe('Iconos de contactos en reportes',  () => {
  let login: AppLoginPage;
  let cabecera: AppCabeceraPage;
  let reportes: AppReportePage;
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

  beforeEach(() => {
    reportes = new AppReportePage();
  });

  it('visualizar un reporte de usuario', () => {
    browser.get('/inicio/reporte/prestaciones');
    browser.waitForAngular();

    // Busco en el listado
    reportes.listaRecursoComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(fila) {
      //cliqueo la vista del reporte a visulizar
      fila[1].element(by.css('td modal-info-persona-prestacion-component')).click();
    });

    browser.waitForAngular();

    expect(element(by.tagName('shared-vista-info-persona')).isPresent()).toBeTruthy();
  });

  it('verifico icono de contacto', () => {
    element(by.tagName('shared-vista-info-persona')).element(by.css('div.btn-group')).all(by.tagName('button')).then(function(botones) {
      botones[1].click();
    });

    browser.waitForAngular();

    expect(element(by.css('ngb-tooltip-window div.tooltip-inner')).getText()).toEqual('2920412228');
  });

  it('verifico si esta presente el boton de red social', () => {
    let botonRedSocial = element(by.tagName('shared-vista-info-persona')).element(by.css('div.btn-group')).element(by.tagName('a'));

    expect(botonRedSocial.isPresent()).toBeTruthy();
  });

  it('cierro modal de vista', () => {
    element(by.css('modal-info-persona-prestacion-content button.close')).click();

    browser.waitForAngular();
  });

  // Cierro la session una vez terminadas las tareas de testing
  afterAll(() => {
    let cabecera = new AppCabeceraPage();

    cabecera.abrirMenu().click()
    browser.waitForAngular();
    cabecera.cerrarSesion().click();
    browser.waitForAngular();
  });

});
