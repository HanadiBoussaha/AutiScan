import sys
import pickle
import numpy as np

# Charger le modèle depuis le fichier pickle
with open('ml_models/Autisme_prediction.pkl', 'rb') as f:
    model = pickle.load(f)

# Récupérer les arguments passés depuis Node.js
input_data = list(map(int, sys.argv[1:]))

# Convertir les données d'entrée en tableau numpy pour le modèle
input_data = np.array(input_data).reshape(1, -1)

# Faire la prédiction
prediction = model.predict(input_data)

# Afficher le résultat de la prédiction
print(prediction[0])
