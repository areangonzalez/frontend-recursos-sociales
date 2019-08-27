import { by, browser, element } from "protractor";
import { AppLoginPage } from "./page-object/app.login-po";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppRecursoPage } from "./page-object/app.recurso-po";
import { elementEnd } from "@angular/core/src/render3/instructions";

describe('obtener listado de alumnos para emprender', () => {
  let login: AppLoginPage;
  let cabecera: AppCabeceraPage;
  let prestacion: AppRecursoPage;
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
    prestacion = new AppRecursoPage();
  });

  it('Agrego beneficiario a prestacion', () => {
    browser.get('/inicio/crear-prestacion');
    browser.waitForAngular();
    // componente de vista de datos de una persona
    let vistaDatosPersona = element(by.tagName('shared-vista-info-persona'));
    // buscador de personas
    let buscadorComp = element(by.tagName('shared-buscar-persona'));
    // busco por Dni
    buscadorComp.element(by.tagName('input')).sendKeys('5894228');
    // clickeo para buscar
    buscadorComp.element(by.css('button.btn-primary')).click();
    // espero a angular
    browser.waitForAngular();
    // resultado de la busqueda
    buscadorComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      // selecciono la persona
      filas[0].click();
    });
    // espero la carga de angular por el elemento de vista
    browser.waitForAngular();

    // reviso los datos
    vistaDatosPersona.element(by.css('div.card-body div.row')).all(by.css('div.col-md-4'))
    .then(function(items){
      // verifico que la persona seleccionada sea la correcta
      expect(items[0].element(by.tagName('dl dd')).getText()).toBe('5894228');
    });
})

  it('buscar y agregar un alumno', () => {
    // selecciono el programa emprender
    prestacion.programa('Emprender');
    // Espero que angular cargue el componente emprender
    browser.waitForAngular()
    // hago la busqueda
    prestacion.buscarPersonaComp().element(by.tagName('input')).sendKeys('luis');
    prestacion.buscarPersonaComp().element(by.css('button.btn-primary')).click();
    //espero que se realice la busqueda
    browser.waitForAngular();

    prestacion.buscarPersonaComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      // selecciono la persona
      filas[2].click();
    });

    browser.waitForAngular();
    prestacion.listaAlumnosComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(alumnos) {
      expect(alumnos.length).toBe(1);
    });
  });

  it('validar que un alumno no se duplique', () => {
    // vuelvo a seleccionar el mismo alumno
    prestacion.buscarPersonaComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      // selecciono la persona
      filas[2].click();
    });
    // espero respuesta de mensaje de error
    browser.waitForAngular();
    // componente mensajes
    let mensajeComp = element(by.tagName('mensajes-alert'));

    expect(mensajeComp.element(by.tagName('p')).getText()).toEqual('Este alumno ya fue ingresado.');

    mensajeComp.element(by.css('button.btn-danger')).click();
    browser.waitForAngular();
  });

  it('Borrar un alumno', () => {
    // borro el alumno
    prestacion.listaAlumnosComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(alumnos) {
      alumnos[0].element(by.css('button.btn-danger')).click();
    });
    // espero que se borre el alumno
    browser.waitForAngular();
    // reviso el listado de alumnos
    prestacion.listaAlumnosComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(alumnos) {
      expect(alumnos[0].element(by.tagName('td')).getText()).toEqual('No hay personas agregadas.');
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
