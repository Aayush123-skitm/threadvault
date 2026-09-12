await page.goto('https://news.ycombinator.com/', { waitUntil: 'networkidle' });
const stories = await page.evaluate(() => Array.from(document.querySelectorAll('a.storylink')).slice(0, 5).map((el) => ({
  title: el.textContent?.trim() ?? '',
  url: el.getAttribute('href') ?? ''
})));
return stories;
