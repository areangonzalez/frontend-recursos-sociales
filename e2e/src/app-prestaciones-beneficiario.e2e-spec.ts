import { by, browser, element } from "protractor";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppLoginPage } from "./page-object/app.login-po";
import { AppReportePage } from "./page-object/app.busqueda-avanzada-po";
import { elementEnd } from "@angular/core/src/render3/instructions";

describe('Reportes beneficiarios',  () => {
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

  it('Ingreso a la vista de un beneficiario', () => {
    browser.get('/inicio/reporte/beneficiarios');
    browser.waitForAngular();
    // Elijo un beneficiario
    reportes.listaBeneficiariosComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(fila) {
      //cliqueo la vista del reporte a visulizar
      fila[1].element(by.css('td modal-info-beneficiario-component')).click();
    });

    browser.waitForAngular();

    expect(element(by.tagName('shared-vista-info-persona')).isPresent()).toBeTruthy();
  });

  it('Verifico la cantidad de prestaciones de subsidios', () => {
    // elemento tab de prestaciones
    let tabPrestaciones = element(by.css('shared-vista-info-prestaciones'));

    tabPrestaciones.element(by.css('div.active')).all(by.css('div.card')).then(function(prestacion) {
      // cuento la cantidad de prestaciones
      expect(prestacion.length).toBe(2);
    });
  });

  it('Verifico la cantidad de prestaciones de emprender', () => {
    // elemento tab de prestaciones
    let tabPrestaciones = element(by.css('shared-vista-info-prestaciones'));
    // clickeo la pestaña emprender
    tabPrestaciones.element(by.css('ul')).all(by.tagName('li')).then(function(enlaces) {
      // clickeo enlace de emprender
      enlaces[2].element(by.tagName('a')).click();
    });
    browser.waitForAngular();


    tabPrestaciones.element(by.css('div.active')).all(by.css('div.card')).then(function(prestacion) {
      // cuento la cantidad de prestaciones
      expect(prestacion.length).toBe(1);
    });
  });

  // Cierro modal
  it('cierro modal de vista', () => {
    element(by.css('modal-info-beneficiario-content button.close')).click();

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
