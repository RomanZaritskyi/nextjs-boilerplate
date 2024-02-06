import axios from 'axios';
import { load } from 'cheerio';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
	const res: { place: string } = await request.json();
	const { place } = res;
	const url = `https://booking.com/searchresults.en-gb.html?ss=Lviv`;

	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	// Navigate the page to a URL
	await page.goto(url);

	// Set screen size
	await page.setViewport({ width: 1080, height: 1024 });

	await page.screenshot({ path: '1.png' });

	const titleSelector = 'h1';

	await page.waitForSelector(titleSelector);

	const amountText = await page.$eval(titleSelector, (el) => el.textContent);
	console.log(amountText);

	return Response.json({ title: amountText });
}
