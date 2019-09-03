import { AppLoginPage } from "./page-object/app.login-po";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppPersonaPage } from "./page-object/app.persona-po";
import { by, browser, element } from "protractor";
import { AppLugarPage } from "./page-object/app.lugar-po";

describe('Editar datos de una persona',() =>{
  let login: AppLoginPage;
  let persona: AppPersonaPage;
  let lugar: AppLugarPage;
  let cabecera: AppCabeceraPage;

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
    persona = new AppPersonaPage();
    lugar = new AppLugarPage();
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

  it('Abro formulario para editar persona', () => {
    let recComp = element(by.css('app-recurso'));
    let modalForm = recComp.element(by.tagName('modal-form-persona-component'));
    // Cliqueo el boton para abrir el formulario de persona
    modalForm.click();
    browser.waitForAngular();

    persona.nroCuilFinal('2');
    persona.fechaNacimiento('10/08/1988');
    persona.estadoCivil('Soltero/a');
    persona.genero('Masculino');
    lugar.formLugarComp().element(by.id('calle')).clear();
    lugar.calle('moreno');
    lugar.altura('324');

    expect(lugar.formLugarComp().element(by.id('calle')).getAttribute('value')).toEqual('moreno');
  });

  it('Edito persona', () => {
    browser.waitForAngular();
    // click al boton guardar
    let botones = persona.formPersonaComp().element(by.css('div.float-right'));
    botones.element(by.css('button.btn-success')).click();

    browser.waitForAngular();
    // verifico el mensaje que se hay guardado exitosamente
    let mensajeComp = element(by.tagName('mensajes-alert'));

    expect(mensajeComp.element(by.tagName('p')).getText()).toEqual('Se han actualizado los datos de la persona con éxito.');

    mensajeComp.element(by.css('button.btn-success')).click();
    browser.waitForAngular();
  });

  afterAll(() => {
    let cabecera = new AppCabeceraPage();

    cabecera.abrirMenu().click()
    browser.waitForAngular();
    cabecera.cerrarSesion().click();
    browser.waitForAngular();
  });

});
