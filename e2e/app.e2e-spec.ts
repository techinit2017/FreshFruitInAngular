import { FreshFruitPage } from './app.po';

describe('fresh-fruit App', () => {
  let page: FreshFruitPage;

  beforeEach(() => {
    page = new FreshFruitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
