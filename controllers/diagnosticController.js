const mongoose = require('mongoose');
const DataModel = require('../models/dataModel'); // Remplace par le modèle approprié

const yourPredictionFunction = async(data) => {
    let score = 0;

    // Ajuste le poids de chaque question en fonction de son importance
    if (data.A1 === "1") score += 1; // Contact visuel
    if (data.A2 === "1") score += 1; // Facilité de contact visuel
    if (data.A3 === "1") score += 1; // Pointer pour indiquer un désir
    if (data.A4 === "1") score += 1; // Pointer pour attirer l'attention
    if (data.A5 === "1") score += 1; // Jouer à faire semblant
    if (data.A6 === "1") score += 1; // Réconforter les autres
    if (data.A7 === "1") score += 1; // Essayer de réconforter
    if (data.A8 === "1") score += 1; // Premiers mots
    if (data.A9 === "1") score += 1; // Gestes simples de communication
    if (data.A10 === "1") score -= 1; // Regarder fixement dans le vide

    // Ajuste les résultats selon l'âge
    const age = parseInt(data.Age_Years, 10);
    if (age < 2) {
        score -= 2; // Penser à des réponses moins sévères pour les très jeunes enfants
    } else if (age > 5) {
        score += 1; // Ajustement pour les enfants plus âgés
    }

    // Logique simplifiée pour deux catégories
    if (score >= 4) {
        return "Autiste";
    } else {
        return "Pas autiste";
    }
};


exports.submitAnswers = async(req, res) => {
    try {
        // Créer une nouvelle instance du modèle avec les données du formulaire
        const answers = new DataModel(req.body);

        // Sauvegarder dans la base de données
        await answers.save();

        // Appeler la fonction de prédiction
        const predictionResult = await yourPredictionFunction(req.body);

        // Renvoyer le formulaire avec le résultat de la prédiction
        res.render('diagnostic', { predictionResult });
    } catch (error) {
        console.error("Erreur lors de la sauvegarde des données", error);
        res.status(400).render('error', { message: error.message });
    }
};