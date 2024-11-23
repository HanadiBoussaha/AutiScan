const mongoose = require('mongoose');

// Schéma de données pour les réponses
const dataSchema = new mongoose.Schema({
    A1: { type: Number, required: true },
    A2: { type: Number, required: true },
    A3: { type: Number, required: true },
    A4: { type: Number, required: true },
    A5: { type: Number, required: true },
    A6: { type: Number, required: true },
    A7: { type: Number, required: true },
    A8: { type: Number, required: true },
    A9: { type: Number, required: true },
    A10_Autism_Spectrum_Quotient: { type: Number, required: true },
    Age_Years: { type: Number, required: true },
    Sex: { type: Number, required: true },
    Ethnicity: { type: Number, required: true },
    Jaundice: { type: Number, required: true },
    Family_mem_with_ASD: { type: Number, required: true },
    Who_completed_the_test: { type: Number, required: true }
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;