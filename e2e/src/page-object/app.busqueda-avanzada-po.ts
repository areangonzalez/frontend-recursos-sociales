import { browser, by, element } from 'protractor';

export class AppReportePage {
  busquedaAvanzadaComp() {
    return element(by.tagName('busqueda-recurso'));
  }

  listaRecursoComp(){
    return element(by.tagName('lista-recurso'));
  }

}
