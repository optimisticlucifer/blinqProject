const { Builder, By, until } = require('selenium-webdriver');

async function automateShopBlinq() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.shop-blinq.io/login');
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[1]/div/form/div[1]/div/input')).sendKeys('blinq_admin');
        await driver.sleep(500);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[1]/div/form/div[2]/div/input')).sendKeys('let_me_in');
        await driver.sleep(500);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[1]/div/form/button')).click();
        await driver.wait(until.urlIs('https://www.shop-blinq.io/products'), 10000);

        const productButtonXpaths = [
            '/html/body/div[1]/div/div/div/div[1]/div/div[1]/button',
            '/html/body/div[1]/div/div/div/div[2]/div/div[1]/button',
            '/html/body/div[1]/div/div/div/div[3]/div/div[1]/button',
            '/html/body/div[1]/div/div/div/div[4]/div/div[1]/button',
            '/html/body/div[1]/div/div/div/div[5]/div/div[1]/button',
        ];

        for (let xpath of productButtonXpaths) {
            await driver.findElement(By.xpath(xpath)).click();
            await driver.sleep(500);
        }

        await driver.findElement(By.xpath('/html/body/div[1]/div/header/div/div[2]')).click();
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div/button')).click();

        
        
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[1]/div/div/form/div[1]/div/input')).sendKeys('Rohan');
        await driver.sleep(500);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[1]/div/div/form/div[2]/div/input')).sendKeys('Bharti');
        await driver.sleep(500);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[1]/div/div/form/div[3]/div/input')).sendKeys('823001');
        await driver.sleep(500);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div/button')).click();

        let confirmationElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div/h4'));
        let confirmationText = await confirmationElement.getText();

        if (confirmationText === 'Thank you for your order') {
            console.log('Order placed and verified successfully!');
        } else {
            console.log('Order is not placed.');
        }

        await driver.sleep(20000);

    } finally {
        await driver.quit();
    }
}

automateShopBlinq();
