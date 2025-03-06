const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { addition, soustraction, constante } = require('./routes/math'); // Importation des fonctions
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));
// Routes
app.use('/articles', require('./routes/articleRoutes'));
console.log('hey');
console.log(addition(5, 3));      // Résultat : 8
console.log(soustraction(10, 4)); // Résultat : 6
console.log(constante);           // Résultat : 3.14


app.listen(PORT, () => console.log(`Serveur démarré sur le port
${PORT}`));