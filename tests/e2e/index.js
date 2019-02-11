const puppeteer = require('puppeteer');

const SCREENSHOT_PATH = './tests/e2e/__screenshots__';
const BASE_URL = 'http://localhost:3000';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`${BASE_URL}`);
	await page.screenshot({path: `${SCREENSHOT_PATH}/initial-load.png`});

	const ReposListView = async () => {
		await page.keyboard.type('google');
		await page.keyboard.press('Enter');
		await page.screenshot({path: `${SCREENSHOT_PATH}/repos-loading.png`});

		await page.waitForSelector('[data-component-type="Item"]');
		await page.screenshot({path: `${SCREENSHOT_PATH}/repos-list.png`});
	};

	const RepoDetailsView = async () => {
		const item = await page.$('[data-component-type="RouterLink"]');
		item.click();

		await page.waitForSelector('[data-component-type="BranchListItem"]');
		await page.screenshot({path: `${SCREENSHOT_PATH}/repos-details.png`});
	};

	const PageNotFoundView = async () => {
		await page.goto(`${BASE_URL}/not-found`);
		await page.waitForSelector('[data-component-type="PageNotFoundMessage"]');
		await page.screenshot({path: `${SCREENSHOT_PATH}/page-not-found.png`});
	};

	const RepoDetailsViewLanguageSelection = async () => {
		await page.goto(`${BASE_URL}`);
		const languageSelector = await page.$('[data-component-type="Dropdown"]');
		await languageSelector.click();
		const options = await page.$$('[data-component-type="DropdownOption"]');
		for (let option of options) {
			const value = await(await option.getProperty('innerText')).jsonValue();
			if (value === 'JavaScript') {
				await option.click();
				break;
			}
		}

		await page.waitForSelector('[data-component-type="Item"]');
		await page.screenshot({path: `${SCREENSHOT_PATH}/repos-language-selector.png`});
	};
	
	await ReposListView();
	await RepoDetailsView();
	await PageNotFoundView();
	await RepoDetailsViewLanguageSelection();
	
	await browser.close();
})();