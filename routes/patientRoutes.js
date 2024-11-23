const express = require('express');
const Patient = require('../models/Patient.js');
const patientController = require('../controllers/patientController');
const router = express.Router();

// Route pour afficher le formulaire d'ajout d'un patient
router.get('/new', patientController.showCreatePatientForm); 
// Routes pour les opérations CRUD
router.post('/', patientController.createPatient); // Créer un patient
router.get('/', patientController.getAllPatients); // Lire tous les patients
router.get('/:id', patientController.getPatientById); // Lire un patient par ID
router.get('/:id/edit', patientController.editPatient);
router.put('/:id', patientController.updatePatient); // Mettre à jour un patient
router.delete('/:id', patientController.deletePatient); // Supprimer un patient

module.exports = router;
