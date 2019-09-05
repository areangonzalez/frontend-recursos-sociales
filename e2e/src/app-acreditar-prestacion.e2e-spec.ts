import { by, browser, element } from "protractor";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppLoginPage } from "./page-object/app.login-po";

describe('Se acredita una prestación',  () => {
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
    buscarRecursoComp.element(by.id('buscar-reporte')).sendKeys('32054238');
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

  it('abrir modal para acreditar la prestación', () => {
    // componente de listado de recursos
    let listaRecursoComp = element(by.tagName('lista-recurso'));
    // busco en el listado para clickear el boton de acreditación
    listaRecursoComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      // clickeo el boton de acreditación de la primera prestación
      filas[0].element(by.css('td modal-acreditar-component')).click();
    });
    // espero a que se abra el modal
    browser.waitForAngular();

    let modalAcreditarContent = element(by.css('div.modal-body'));

    expect(modalAcreditarContent.element(by.id('fecha_acreditacion')).isPresent()).toBe(true);
  });

  it('Completo formulario', () => {
    // contenido del modal
    let modalAcreditarContent = element(by.css('div.modal-body'));

    // agrego fecha de baja
    modalAcreditarContent.element(by.id('fecha_acreditacion')).sendKeys('10/10/2014');

    element(by.css('div.modal-footer button.btn-success')).click();
    browser.waitForAngular();

    let alertComp = element(by.tagName('mensajes-alert'));

    expect(alertComp.element(by.css('div.mensaje-alert-body p')).getText()).toEqual('Se ha confirmado la acreditación.');

    alertComp.element(by.css('button.btn-success')).click();
    browser.waitForAngular();
  });

  it('confirmo la prestacion Acreditada', () => {
    // componente de listado de recursos
    let listaRecursoComp = element(by.tagName('lista-recurso'));
    // verifico si la prestacion se dio de baja
    listaRecursoComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      // verifico si el boton de baja esta presente
      expect(filas[0].element(by.css('td modal-acreditar-component')).isPresent()).toBeFalsy();
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
