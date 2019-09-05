import { by, browser, element } from "protractor";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppLoginPage } from "./page-object/app.login-po";

describe('Buscador de persona',  () => {
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

  it('busco prestacion por DNI de beneficiario', () => {
    // me dirijo a reportes y visualizo las prestaciones
    browser.get('/inicio/reporte/prestaciones');
    browser.waitForAngular();
    // componente de busqueda
    let buscarRecursoComp = element(by.tagName('busqueda-recurso'));
    // componente de listado de recursos
    let listaRecursoComp = element(by.tagName('lista-recurso'));

    // ingreso el documento en el campo del buscador
    buscarRecursoComp.element(by.id('buscar-reporte')).sendKeys('28414555');
    // Hago click en el boton para realizar la busqueda
    buscarRecursoComp.element(by.css('button.btn-primary')).click();
    // espero que se aplique el filtrado
    browser.waitForAngular();
    // resultado de la busqueda
    listaRecursoComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(resultado) {
      // selecciono la persona
      expect(resultado.length).toBe(4);
    });
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
