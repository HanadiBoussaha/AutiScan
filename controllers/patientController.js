const Patient = require('../models/Patient');

exports.showCreatePatientForm = (req, res) => {
    res.render('Patient'); // Assure-toi que le fichier EJS s'appelle 'createPatient.ejs'
};
// Créer un nouveau patient
exports.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire tous les patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        //res.status(200).json(patients);
        res.render('dashpatient', { patients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lire un patient par ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient non trouvé' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un patient
exports.editPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient non trouvé' });
        res.render('editPatient', { patient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Mettre à jour un patient
exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/patients');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un patient
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient non trouvé' });
        }
        req.flash('success_msg', 'Patient supprimé avec succès');
        res.redirect('/patients'); // Redirige vers la liste des patients
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

