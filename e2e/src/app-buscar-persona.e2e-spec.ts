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

  it('busco una persona por apellido', () => {
    browser.get('/inicio/crear-prestacion');
    browser.waitForAngular();
    // componente del buscador
    let buscadorComp = element(by.tagName('shared-buscar-persona'));
    // ingreso el apellido a buscar
    buscadorComp.element(by.tagName('input')).sendKeys('Díaz');
    // clickeo el boton buscar
    buscadorComp.element(by.css('button.btn-primary')).click();
    // espero a angular
    browser.waitForAngular();
    // verifico el resultado de la busqueda
    buscadorComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      expect(filas.length).toBe(5);
    });
  });

  it('limpio el input de la busqueda', () => {
    // componente del buscador
    let buscadorComp = element(by.tagName('shared-buscar-persona'));
    // clickeo el boton limpiar
    buscadorComp.element(by.css('button.btn-danger')).click();
    // espero a angular
    browser.waitForAngular();

    buscadorComp.element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(filas) {
      // al no haber resultado siempre muestra una fila.
      expect(filas.length).toBe(1);
    });
  });

  it('Selecciono una persona al realizar una busqueda', () => {
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

  // Cierro la session una vez terminadas las tareas de testing
  afterAll(() => {
    let cabecera = new AppCabeceraPage();

    cabecera.abrirMenu().click()
    browser.waitForAngular();
    cabecera.cerrarSesion().click();
    browser.waitForAngular();
  });

});
