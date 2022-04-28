const puppeteer = require('puppeteer')

const pdf = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('http://localhost:3000/requisition/pdf', {
		waitUntil: 'load',
	})
	await page.pdf({ printBackground: true, path: 'teste.pdf', format: 'a4' })

	await browser.close()
}
pdf()
