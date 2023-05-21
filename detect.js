import playwright from 'playwright';


async function takeScreenShots(url) {
    // Create a new browser instance.
    const browser = await playwright.chromium.launch({
        headless: true,
    });

    // Create a new context.
    const context = await browser.newContext({
        recordHar: { path: './har/example.har' }
    });

    // Create a new page.
    const page = await context.newPage()

    // Set viewport.
    await page.setViewportSize({ width: 1280, height: 1024 });

    // Go to page
    await page.goto(url, { waitUntil: 'load' })

    // Target accept button.
    const acceptButton = await page.waitForSelector('button[class*=accept]' , { visible: true });

    // Click on accept button.
    await acceptButton.click();

    // Scroll to bottom of page
    await scrollFullPage(page);

    // Take screenshot
    await page.screenshot({ type: 'png', path: './images/new.png', fullPage: true, animations: 'disabled' })

    // Close context to ensure HAR is saved to disk.
    await context.close();

    // Close browser instance.
    await browser.close()
}

async function run() {
    try {
        takeScreenShots()
    } catch (err) {
        console.log(err);
    }
}

run()

async function scrollFullPage(page) {
    await page.evaluate(async () => {
        await new Promise(resolve => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
