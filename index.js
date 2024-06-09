const { Builder, By, until } = require('selenium-webdriver');

async function automateShopBlinq() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        //for login
        await driver.get('https://www.shop-blinq.io/login');
        await driver.findElement(By.name('username')).sendKeys('blinq_admin');
        await driver.sleep(500);
        await driver.findElement(By.name('password')).sendKeys('let_me_in');
        await driver.sleep(500);
        await driver.findElement(By.tagName('button')).click();
        await driver.wait(until.urlIs('https://www.shop-blinq.io/products'), 10000);


        //adding products to cart
        const addToCartButtonUniqueCssClass ='css-t18qza';
        const buttons = await driver.findElements(By.css(`.${addToCartButtonUniqueCssClass}`));
        for (let button of buttons) {
            await button.click();
            await driver.sleep(500);
        }

        //to click on cart
        await driver.findElement(By.id('cart')).click();
        await driver.sleep(500);


        //to click on checkOut
        const checkoutButtonUniqueCss = 'css-i2gcwn';
        await driver.findElement(By.className(checkoutButtonUniqueCss)).click();



        //adding details for shopping 
        const valueForInputField = ['Rohan', 'Bharti', '823001'];
        const inputFields = await driver.findElements(By.css('.MuiOutlinedInput-input'));
        for (let i = 0; i < inputFields.length; i++) {
            await inputFields[i].sendKeys(i<valueForInputField.length ? valueForInputField[i] : "random");
            await driver.sleep(500);
        }

        //to click on continue
        await driver.findElement(By.className(checkoutButtonUniqueCss)).click();



        let confirmationElement = await driver.findElement(By.xpath('//h4'));
        let confirmationText = await confirmationElement.getText();

        if (confirmationText === 'Thank you for your order') {
            console.log('Order placed and verified successfully!');
        } else {
            console.log('Order is not placed.');
        }

        await driver.sleep(20000);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}

automateShopBlinq();
