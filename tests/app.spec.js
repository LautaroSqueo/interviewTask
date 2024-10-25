const { test, expect } = require('@playwright/test');

test.describe('Functional UI Testing', () => {
    test('Search functionality', async ({ page }) => {
        await page.goto('/');

        await page.waitForSelector('.MuiBox-root.css-3u751r');
        const fatherDiv = await page.locator('.MuiBox-root.css-3u751r');

        await page.waitForSelector('.MuiGrid-root.MuiGrid-container.css-adtkzx .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-1udb513');
        const sons = await fatherDiv.locator('.MuiGrid-root.MuiGrid-container.css-adtkzx .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-1udb513');

        const sonsTracks = await sons.evaluateAll(divs =>
            divs.map(div => div.querySelector('p')?.textContent.trim()).filter(Boolean)
        );

        const searchInput = await page.locator('input[type="text"]');

        for (const track of sonsTracks) {
            await searchInput.fill(track);

            let results = await page.locator(`xpath=//p[normalize-space()="${track}"]`);
            await expect(results).toBeVisible();
            await expect(results).toHaveCount(1);
        }
    });

    test('Add Track using "+"', async ({ page }) => {
        await page.goto('/');

        const searchInput = await page.locator('input[type="text"]');
        await searchInput.fill('Summer Breeze');

        let results = await page.locator('xpath=//p[normalize-space()="Summer Breeze"]');
        await expect(results).toBeVisible();

        const addButton = await page.locator('button[type="button"]');
        await addButton.click();

        await page.waitForSelector('.MuiTypography-root.MuiTypography-body1.css-sg94qv');
        const title = await page.locator('.MuiTypography-root.MuiTypography-body1.css-sg94qv');
        await expect(title).toBeVisible();

        const trackAdded = await page.locator('div[id="playlist"] div[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-4 css-1udb513"] p[class="MuiTypography-root MuiTypography-body1 css-3ffyn9"]');
        await expect(trackAdded).toBeVisible();
        await expect(trackAdded).toHaveCount(1);
    });

    test('Add Multiple Tracks', async ({ page }) => {
        await page.goto('/');

        await page.waitForSelector('.MuiBox-root.css-3u751r');
        const fatherDiv = await page.locator('.MuiBox-root.css-3u751r');

        await page.waitForSelector('.MuiGrid-root.MuiGrid-container.css-adtkzx .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-1udb513');
        const sons = await fatherDiv.locator('.MuiGrid-root.MuiGrid-container.css-adtkzx .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-1udb513');

        const sonsTracks = await sons.evaluateAll(divs =>
            divs.map(div => div.querySelector('p')?.textContent.trim()).filter(Boolean)
        );

        let count = 0;
        for (const track of sonsTracks) {
            count = 1;
            const searchInput = await page.locator('input[type="text"]');
            await searchInput.fill(track);

            let results = await page.locator(`xpath=//p[normalize-space()="${track}"]`);
            await expect(results).toBeVisible();

            const addButton = await page.locator(`xpath=//div[@id="tracklist"]//div[@class="MuiBox-root css-3u751r"]//div[${count}]//button[${count}]`);
            await addButton.click();
        }

        const trackAdded = await page.locator('div[id="playlist"] div[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-4 css-1udb513"] p[class="MuiTypography-root MuiTypography-body1 css-3ffyn9"]');
        await expect(trackAdded).toHaveCount(sonsTracks.length);

    });
});
