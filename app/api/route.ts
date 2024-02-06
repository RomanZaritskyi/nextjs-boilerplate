import axios from 'axios';
import { load } from 'cheerio';
// import { NextApiResponse, NextApiRequest } from 'next';

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	if (req.method === 'POST') {
// 		const { checkin, checkout, places } = req.body;
// 		const parsedPlaces = places.split(',').map((place: string) => ({
// 			name: place,
// 			checkin,
// 			checkout,
// 		}));
// 		let parsedInfo = [];

// 		try {
// 			for (const place of parsedPlaces) {
// 				const url = `https://booking.com/searchresults.en-gb.html?ss=${place.name}&checkin=${place.checkin}&checkout=${place.checkout}`;
// 				console.log('sending...');
// 				console.time('await axios.get');
// 				const response = await axios.get(url);
// 				console.timeEnd('await axios.get');

// 				const $ = load(response.data);
// 				// Extract the text content of a specific element;
// 				const titleSelector =
// 					'.bcbf33c5c3 .efdb2b543b.e4b7a69a57 h1[aria-live="assertive"]';
// 				const title = $(titleSelector).text();

// 				parsedInfo.push(title);
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			return res.status(500).json({ error: 'Internal Server Error' });
// 		}
// 		return res.json({ parsedInfo });
// 	} else {
// 		return res.status(405).json({ error: 'Method Not Allowed' });
// 	}
// }
// ----------------------------------------------------

// export async function POST(request: Request) {
// 	const res: { place: string } = await request.json();
// 	const { place } = res;
// 	const url = `https://booking.com/searchresults.en-gb.html?ss=Lviv`;

// 	const axiosResponse = await axios.get(url);
// 	const $ = load(axiosResponse.data);

// 	const titleSelector = 'h1';
// 	const title = $(titleSelector).text();

// 	return Response.json({ title: title });
// }

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
