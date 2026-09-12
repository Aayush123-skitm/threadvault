await page.goto('https://example.com');
return {
  url: page.url(),
  title: await page.title(),
  text: (await page.locator('body').innerText()).slice(0, 80)
};
