const express = require('express');
const router = express.Router();
const diagnosticController = require('../controllers/diagnosticController');

// Route pour afficher le formulaire
router.get('/questions', (req, res) => {
    res.render('diagnostic'); // Affiche le formulaire
});

// Route pour soumettre les réponses
router.post('/submit-answers', diagnosticController.submitAnswers);

module.exports = router;