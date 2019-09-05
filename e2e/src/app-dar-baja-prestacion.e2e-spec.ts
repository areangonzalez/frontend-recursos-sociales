import { by, browser, element } from "protractor";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppLoginPage } from "./page-object/app.login-po";

describe('Dar baja una prestación',  () => {
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

  it('abrir modal para dar de baja la prestación', () => {
    // componente de listado de recursos
    let listaRecursoComp = element(by.tagName('lista-recurso'));
    // busco en el listado para clickear el formulario de baja
    listaRecursoComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      // clickeo el boton de baja a la primera prestación
      filas[0].element(by.css('td modal-baja-component')).click();
    });
    // espero a que se abra el modal
    browser.waitForAngular();

    let modalBajaContent = element(by.css('div.modal-body'));

    expect(modalBajaContent.element(by.id('fecha_baja')).isPresent()).toBe(true);
  });

  it('Completo formulario', () => {
    // contenido del modal
    let modalBajaContent = element(by.css('div.modal-body'));

    // agrego fecha de baja
    modalBajaContent.element(by.id('fecha_baja')).sendKeys('10/10/2014');
    // agrego descripción de baja
    modalBajaContent.element(by.id('descripcion')).sendKeys('Se realiza baja por falta de presupuesto');

    element(by.css('div.modal-footer button.btn-success')).click();
    browser.waitForAngular();

    expect(element(by.css('div.modal-body p')).getText()).toEqual('¿Esta seguro que desea dar de baja la prestación?');
  });

  it('Confirmo baja', () => {
    // confirmo la baja
    element(by.css('div.modal-footer button#confirmacion_baja')).click();
    // espero que se de baja
    browser.waitForAngular();

    let alertComp = element(by.tagName('mensajes-alert'));

    expect(alertComp.element(by.css('div.mensaje-alert-body p')).getText()).toEqual('Se ha confirmado la baja.');

    alertComp.element(by.css('button.btn-success')).click();
    browser.waitForAngular();
  });

  it('confirmo la prestacion dada de baja', () => {
    // componente de listado de recursos
    let listaRecursoComp = element(by.tagName('lista-recurso'));
    // verifico si la prestacion se dio de baja
    listaRecursoComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      // verifico si el boton de baja esta presente
      expect(filas[0].element(by.css('td modal-baja-component')).isPresent()).toBeFalsy();
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
