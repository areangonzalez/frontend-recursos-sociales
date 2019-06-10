import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/localhost:4200');
  }

  getParagraphText() {
    return element(by.css('app-login h1')).getText();
  }
}
