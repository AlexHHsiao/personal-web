import { PersonalWebPage } from './app.po';

describe('personal-web App', () => {
  let page: PersonalWebPage;

  beforeEach(() => {
    page = new PersonalWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
