await page.goto('https://news.ycombinator.com/');
const rows = await page.locator('tr.athing').evaluateAll((elements) =>
  elements.slice(0, 5).map((el, index) => ({
    index: index + 1,
    title: el.querySelector('a.storylink')?.textContent?.trim() ?? '',
    url: el.querySelector('a.storylink')?.getAttribute('href') ?? ''
  }))
);
return rows;
