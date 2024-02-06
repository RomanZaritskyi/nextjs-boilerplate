import axios from 'axios';
import { load } from 'cheerio';
import puppeteer from 'puppeteer';
import { KnownDevices } from 'puppeteer';
const iPhone = KnownDevices['iPad landscape'];

export async function POST(request: Request) {
	const res: { place: string } = await request.json();
	const { place } = res;
	const url = `https://booking.com/searchresults.en-gb.html?ss=Lviv`;

	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.emulate(iPhone);

	// Navigate the page to a URL
	await page.goto(url);

	// Set screen size
	await page.setViewport({ width: 1080, height: 1024 });

	await page.screenshot({ path: '1.png' });

	const titleSelector = '.f6431b446c';

	await page.waitForSelector(titleSelector);

	const amountText = await page.$eval(titleSelector, (el) => el.textContent);
	console.log(amountText);
	await browser.close();

	return Response.json({ title: amountText });
}
