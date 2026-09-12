await page.goto('https://news.ycombinator.com/');
const stories = await page.locator('a.storylink').evaluateAll((els) =>
  els.slice(0, 5).map((el) => ({
    title: el.textContent?.trim() ?? '',
    url: el.getAttribute('href') ?? ''
  }))
);
return stories;
