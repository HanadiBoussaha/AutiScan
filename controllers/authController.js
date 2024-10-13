const User = require('../models/User');

// Fonction d'enregistrement d'utilisateur
exports.register = async (req, res) => {
    const { name, email, password, speciality } = req.body;

    try {
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        // Crée un nouvel utilisateur
        const newUser = new User({
            name,
            email,
            password,
            speciality,
            photo: req.file ? req.file.path : undefined, // Si tu utilises multer pour gérer les fichiers
        });

        // Enregistre l'utilisateur dans la base de données
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }
};


// Fonction de connexion d'utilisateur
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Authentification réussie
        req.session.user = user; // Enregistre l'utilisateur dans la session
        res.redirect('/dashboard'); // Redirige vers le tableau de bord
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

// Fonction pour afficher le tableau de bord
exports.dashboard = (req, res) => {
    res.render('dashboard', {
        name: req.session.user.name, // Passe le nom de l'utilisateur à la vue
        photoUrl: req.session.user.photoUrl // Passe la photo si nécessaire
    });
};





exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
