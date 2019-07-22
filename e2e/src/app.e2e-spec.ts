import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    browser.waitForAngular("true");
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Gestor de Prestaciones');
  });
});
