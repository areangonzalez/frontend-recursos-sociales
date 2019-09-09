import { by, browser, element } from "protractor";
import { AppCabeceraPage } from "./page-object/app.cabecera-po";
import { AppLoginPage } from "./page-object/app.login-po";
import { AppReportePage } from "./page-object/app.busqueda-avanzada-po";


describe('busqueda avanzada',  () => {
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

  it('Abro la busqueda avanzada', () => {
    browser.get('/inicio/reporte/prestaciones');
    browser.waitForAngular();
    // cliqueo el boton de busqueda avanzada
    reportes.busquedaAvanzadaComp().element(by.css('button.btn-md.btn-primary')).click();
  });

  it('Busco por cipolletti', () => {
    // ingreso la localidad
    reportes.busquedaAvanzadaComp().element(by.id('localidad')).element(by.cssContainingText('option', 'Cipolletti')).click();
    // cliqueo el boton buscar
    reportes.busquedaAvanzadaComp().element(by.css('button.btn-primary')).click();
    // espero el resultado
    browser.waitForAngular();
    // vefrifico el resultado
    reportes.listaRecursoComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(resultado) {
      // muestro la cantidad encontrada
      expect(resultado.length).toBe(7);
    });
  });

  it('Busco por General Roca', () => {
    // ingreso la localidad
    reportes.busquedaAvanzadaComp().element(by.id('localidad')).element(by.cssContainingText('option', 'General Roca')).click();
    // cliqueo el boton buscar
    reportes.busquedaAvanzadaComp().element(by.css('button.btn-primary')).click();
    // espero el resultado
    browser.waitForAngular();
    // vefrifico el resultado
    reportes.listaRecursoComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(resultado) {
      // muestro la cantidad encontrada y vefrifico el resultado
      expect(resultado.length).toBe(6);
    });
  });

  it('Busco por Viedma', () => {
    // ingreso la localidad
    reportes.busquedaAvanzadaComp().element(by.id('localidad')).element(by.cssContainingText('option', 'Viedma')).click();
    // cliqueo el boton buscar
    reportes.busquedaAvanzadaComp().element(by.css('button.btn-primary')).click();
    // espero el resultado
    browser.waitForAngular();
    // vefrifico el resultado
    reportes.listaRecursoComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(resultado) {
      // muestro la cantidad encontrada y vefrifico el resultado
      expect(resultado.length).toBe(4);
    });
  });

  it('Limpio los campos', () => {
    // cliqueo el boton de limpiar
    reportes.busquedaAvanzadaComp().element(by.css('button.btn-danger')).click();
    browser.waitForAngular();

    reportes.listaRecursoComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(resultado) {
      // muestro la cantidad encontrada y vefrifico el resultado
      expect(resultado.length).toBe(20);
    });

  });

  it('busco por programa habitat en localidad cipolletti', () => {
    // abro la busqueda avanzada
    reportes.busquedaAvanzadaComp().element(by.css('button.btn-md.btn-primary')).click();
    // combo localidad
    reportes.busquedaAvanzadaComp().element(by.id('localidad')).element(by.cssContainingText('option', 'Cipolletti')).click();
    // combo programa
    reportes.busquedaAvanzadaComp().element(by.id('programa')).element(by.cssContainingText('option', 'Habitat')).click();
    // click al boton buscar
    reportes.busquedaAvanzadaComp().element(by.css('button.btn-primary')).click();
    // espero el resultado
    browser.waitForAngular();

    reportes.listaRecursoComp().element(by.tagName('table tbody')).all(by.tagName('tr')).then(function(resultado) {
      // muestro la cantidad encontrada y vefrifico el resultado
      expect(resultado.length).toBe(2);
    });
  })

  // Cierro la session una vez terminadas las tareas de testing
  afterAll(() => {
    let cabecera = new AppCabeceraPage();

    cabecera.abrirMenu().click()
    browser.waitForAngular();
    cabecera.cerrarSesion().click();
    browser.waitForAngular();
  });

});
