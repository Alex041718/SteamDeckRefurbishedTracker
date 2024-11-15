require('dotenv').config();
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

async function sendEmail(count) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'Steam Deck Stock Alert',
        text: `Nombre d'occurrences de "Out of stock" : ${count} (différent de 3)`
    };

    return transporter.sendMail(mailOptions);
}

async function checkOutOfStock() {
    const url = 'https://store.steampowered.com/sale/steamdeckrefurbished';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Va sur la page spécifiée
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        // Wait for Steam store content to load
        await page.waitForSelector('.sale_page_background');
        
        // make a screenshot
        await page.screenshot({ fullPage: true, path: 'screenshot.png' });

        // Compte le nombre d'occurrences de "Out of stock"
        const count = await page.evaluate(() => {
            const textToFind = 'Out of stock';
            return Array.from(document.body.querySelectorAll('.CartBtn')) // Sélectionne tous les éléments
                .filter(element => element.textContent.includes(textToFind)).length;
        });
        
        return count;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return -1; // Retourne -1 en cas d'erreur
    } finally {
        await browser.close();
    }
}

module.exports = checkOutOfStock;

// Example usage:
// (async () => {
//     const result = await checkOutOfStock();
//     console.log(`Nombre d'occurrences de "Out of stock" : ${result}`);
// })();

async function runCheck() {
    console.log('Démarrage de la vérification:', new Date().toISOString());
    const result = await checkOutOfStock();
    console.log(`Nombre d'occurrences de "Out of stock" : ${result}`);
    if (result != 3 && result !== -1) {
        try {
            await sendEmail(result);
            console.log('Email envoyé avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
    }
}

// Exécute la vérification toutes les 5 minutes
setInterval(runCheck, 5 * 60 * 1000);
// Première exécution immédiate
runCheck();
