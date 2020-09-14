import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
  xit('When I add a book and undo', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    
    
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    
    const firstWantToRead = await $('button[color="primary",ng-reflect-disabled="false"]:first');
    await firstWantToRead.click();

    
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const items = await $$('.reading-list-item--details');
    expect(items.length).toBeGreaterThan(1);

    const removeButton = await $("mat-icon:contains('remove')");
    await removeButton.click();

    const undoButton = await $("simple-snack-bar").children("button:first");
    await undoButton.click();

  });
});
