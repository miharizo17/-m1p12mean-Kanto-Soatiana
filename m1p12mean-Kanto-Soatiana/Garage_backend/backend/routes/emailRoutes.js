const express = require('express');
const router = express.Router();
const mongoose = require('../server');
const nodemailer = require('nodemailer');
router.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    // Configurer le transporteur (utilise ton email et mot de passe)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kantomiharizo@gmail.com',      // Remplace par ton email
            pass: 'vcaz bbsr avjj xmxm'       // Remplace par ton mot de passe d'application
        }
    });

    // Options de l'email
    const mailOptions = {
        from: 'kantomiharizo@gmail.com',          // Remplace par ton email
        to: to,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé : ' + info.response);
        res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi :', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
});

module.exports = router;