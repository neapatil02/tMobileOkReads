import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  it('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // TODO: Implement this test!

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('s');

    
    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);

    await input.sendKeys('c');
    await input.sendKeys('r');
    await input.sendKeys('i');
    browser.wait(ExpectedConditions.textToBePresentInElementValue($("input[formControlName='term']"),'scri'),510);
    
    const renewedItems = await $$('[data-testing="book-item"]');
    expect(renewedItems.length).toBeGreaterThan(1);
  });
});
