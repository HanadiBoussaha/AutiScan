const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prénom: { type: String, required: true },
    dateDeNaissance: { type: Date, required: true },
    sexe: { type: String, enum: ['Masculin', 'Féminin'], required: true },
    adresse: {
        rue: { type: String },
        ville: { type: String },
        codePostal: { type: String }
    },
    numéroDeTéléphone: { type: String },
    email: { type: String },
    diagnostic: { type: String },
    dateDiagnostic: { type: Date },
    scolarité: { type: String },
    historiqueMédical: { type: String },
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;