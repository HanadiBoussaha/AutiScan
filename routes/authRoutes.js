const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Assurez-vous que le chemin est correct
const multer = require('multer');

// Configuration de multer pour gérer les fichiers uploadés
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Chemin où les fichiers seront enregistrés
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Renomme le fichier pour éviter les conflits
    },
});

const upload = multer({ storage });
// Route pour afficher le formulaire d'inscription
router.get('/register', (req, res) => {
    res.render('register'); // Ceci affichera la vue register.ejs
});


// Route pour le traitement de l'inscription
router.post('/register', upload.single('photo'), authController.register);

// Route pour la page de connexion
router.get('/login', (req, res) => {
    res.render('login'); // Assure-toi que le fichier login.ejs existe
});

// Route pour le traitement de la connexion
router.post('/login', authController.login);

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // L'utilisateur est authentifié
    }
    res.redirect('/login'); // Redirige vers la page de connexion
}

// Dans routes/authRoutes.js
router.get('/dashboard', isAuthenticated, authController.dashboard);
// Dans ton fichier de routes (par exemple, authRoutes.js)

// Route pour la déconnexion
router.get('/logout', authController.logout);

module.exports = router;
