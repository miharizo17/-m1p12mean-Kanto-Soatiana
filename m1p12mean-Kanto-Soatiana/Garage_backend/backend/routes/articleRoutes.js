const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const mongoose = require('../server');

// Créer un article
router.post('/', async (req, res) => {
    try {
        const { title, content, test } = req.body;
        console.log(req.body);
        // const article = new Article(req.body);
        const article = new Article({  content,title });
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route POST pour insérer un article
// router.post('/', async (req, res) => {
//     try {
//         const { titre, contenu } = req.body;

//         if (!titre || !contenu) {
//             return res.status(400).json({ message: 'Le titre et le contenu sont obligatoires.' });
//         }

//         // Utiliser mongoose.connection.db pour accéder à MongoDB
//         const db = mongoose.connection.db;
//         const collection = db.collection('articles');

//         const result = await collection.insertOne({
//             title: titre,
//             content: contenu,
//             createdAt: new Date()
//         });

//         res.status(201).json({
//             message: 'Article inséré avec succès.',
//             articleId: result.insertedId
//         });

//     } catch (error) {
//         console.error('❌ Erreur d\'insertion :', error);
//         res.status(500).json({ message: `Erreur serveur : ${error.message}` });
//     }
// });

// Lire tous les articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/filtre', async (req, res) => {
    const { contenu, title } = req.query; // Récupération des paramètres de requête
    console.log(req.query);

    try {
        // Construire l'objet de filtre
        let filtre = {};

        if (contenu) {
            filtre.content = { $regex: contenu, $options: 'i' }; // Filtre par contenu (insensible à la casse)
        }

        if (title) {
            filtre.title = { $regex: title, $options: 'i' }; // Filtre par titre (insensible à la casse)
        }

        // Rechercher les articles avec les filtres
        const articles = await Article.find(filtre);
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Mettre à jour un article
router.put('/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Supprimer un article
router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "Article supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function addition(a, b) {
    return a + b;
}

module.exports = addition;
module.exports = router;