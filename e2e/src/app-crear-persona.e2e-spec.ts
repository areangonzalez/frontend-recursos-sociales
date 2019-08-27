import { AppLoginPage } from "./page-object/app.login-po";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppPersonaPage } from "./page-object/app.persona-po";
import { by, browser, element } from "protractor";
import { AppLugarPage } from "./page-object/app.lugar-po";

describe('Crear una persona no registrada en el sistema',() =>{
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
  })

  beforeEach(() => {
    persona = new AppPersonaPage();
    lugar = new AppLugarPage();
  });


  it('Abrir formulario persona', () => {
    browser.get('/inicio/crear-prestacion');
    let recComp = element(by.css('app-recurso'));
    browser.waitForAngular();
    let modalForm = recComp.element(by.tagName('modal-form-persona-component'));
    // Cliqueo el boton para abrir el formulario de persona
    modalForm.click();
    browser.waitForAngular();
    // Comparo si el modal se abre
    expect(persona.formPersonaComp().isPresent()).toBeTruthy();
    browser.waitForAngular();
  });

  it('Completo formulario persona', () => {

    persona.documento('33476725');
    persona.nroCuilPrincipio('20');
    persona.nroCuilFinal('3');
    persona.apellido('Robles');
    persona.nombre('Carlos');
    persona.fechaNacimiento('10/03/1987');
    persona.estadoCivil('Soltero');
    persona.sexo('Hombre');
    persona.genero('Masculino');
    lugar.localidad('Viedma');
    lugar.calle('La pampa');
    lugar.altura('23');

    let nombrePersona = persona.formPersonaComp().element(by.id('nombre')).getAttribute('value');

    expect(nombrePersona).toEqual('Carlos');
  });


  it('Guardar persona', () => {
    browser.waitForAngular();
    // click al boton guardar
    let botones = persona.formPersonaComp().element(by.css('div.float-right'));
    botones.element(by.css('button.btn-success')).click();

    browser.waitForAngular();
    // verifico el mensaje que se hay guardado exitosamente
    let mensajeComp = element(by.tagName('mensajes-alert'));

    expect(mensajeComp.element(by.tagName('p')).getText()).toEqual('Se ha guardado la persona con éxito.');

    mensajeComp.element(by.css('button.btn-success')).click();
    browser.waitForAngular();
  });

  it('verifico los datos de la persona agregada', () => {
    let vistaDatosPersona = element(by.tagName('shared-vista-info-persona'));

    vistaDatosPersona.element(by.css('div.card-body div.row')).all(by.css('div.col-md-4'))
    .then(function(items){
      //expect(items.length).toBe(3);
      // verifico si es valido el cuil
      expect(items[1].element(by.tagName('dl dd')).getText()).toBe('20334767253');
    });
  });

  afterAll(() => {
    let cabecera = new AppCabeceraPage();

    cabecera.abrirMenu().click()
    browser.waitForAngular();
    cabecera.cerrarSesion().click();
    browser.waitForAngular();
  });

});
