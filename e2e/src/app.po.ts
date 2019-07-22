import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/login');
  }

  getParagraphText() {
    return element(by.css('app-login h1')).getText();
  }
}
