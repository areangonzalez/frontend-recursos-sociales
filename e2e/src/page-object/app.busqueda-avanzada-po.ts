import { browser, by, element } from 'protractor';

export class AppReportePage {
  // Buscador de prestaciones
  busquedaAvanzadaComp() {
    return element(by.tagName('busqueda-recurso'));
  }
  // Listado de prestaciones
  listaRecursoComp(){
    return element(by.tagName('lista-recurso'));
  }
  // Listado de beneficairios
  listaBeneficiariosComp() {
    return element(by.tagName('lista-beneficiario'));
  }
  // buscador de beneficiario
  buscadorBeneficiarioComp() {
    return element(by.tagName('busqueda-beneficiario'));
  }
}
