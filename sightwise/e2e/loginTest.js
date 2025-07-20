const { Builder, By, until } = require('selenium-webdriver');

const assert = require('assert');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:4200/login');

        // Attendre que le champ username soit visible
        let usernameInput = await driver.wait(until.elementLocated(By.id('username')), 40000);
        await driver.wait(until.elementIsVisible(usernameInput), 70000);
        assert.ok(await usernameInput.isDisplayed(), "Le champ username est affiché");

        // Ajouter une pause de 3s  pour observer l'élément username
        await driver.sleep(3000);

        // Attendre que le champ password soit visible
        let passwordInput = await driver.wait(until.elementLocated(By.id('password')), 40000);
        await driver.wait(until.elementIsVisible(passwordInput), 70000);
        assert.ok(await passwordInput.isDisplayed(), "Le champ password est affiché");

        // Ajouter une pause pour observer l'élément password
        await driver.sleep(3000);

        // Entrer les valeurs dans les champs
        await usernameInput.sendKeys('foufa');
        await driver.sleep(1000); // Pause après avoir saisi le username
        await passwordInput.sendKeys('987654321');
        await driver.sleep(1000); // Pause après avoir saisi le password

        // Soumettre le formulaire
        let loginButton = await driver.findElement(By.css('button[type="submit"]'));
        await loginButton.click();

        // Ajouter une pause pour observer le clic sur le bouton de soumission
        await driver.sleep(3000);

        // Vérifier l'URL de la page de profil (ou autre page d'accueil après connexion)
        await driver.wait(until.urlIs('http://localhost:4200/attraction'), 70000);

        // Ajouter une pause pour observer la page de profil
        await driver.sleep(5000);

        console.log("Le test de connexion a réussi !");
    } catch (error) {
        console.error('Le test a échoué avec l\'erreur:', error);
    } finally {
        await driver.quit();
    }
}

runTest();
