import { CAREAppPage } from './app.po';

describe('care-app App', function() {
  let page: CAREAppPage;

  beforeEach(() => {
    page = new CAREAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
