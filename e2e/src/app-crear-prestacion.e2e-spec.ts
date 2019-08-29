import { by, browser, element } from "protractor";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppLoginPage } from "./page-object/app.login-po";
import { AppRecursoPage } from "./page-object/app.recurso-po";
import { AppContactoPage } from "./page-object/app.contacto-po";

describe('Crear prestación',  () => {
  let login: AppLoginPage;
  let cabecera: AppCabeceraPage;
  let prestacion: AppRecursoPage;
  let contacto: AppContactoPage;
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
    contacto = new AppContactoPage();
  });

  it('Selecciono una persona', () => {
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
  });

  it('agrego mail en contacto', () => {
    contacto.email().sendKeys('al_flores@gmail.com');

    expect(contacto.email().getAttribute('value')).toEqual('al_flores@gmail.com');
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
