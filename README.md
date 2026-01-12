TicTacTrip Justify API
Description

API REST pour justifier du texte passé en paramètre.

Langage : Node.js + TypeScript

Authentification : Token unique généré via /api/token

Limite : 80 000 mots par token par jour

Longueur des lignes : 80 caractères

Installation

1 - Clone le repo :
git clone https://github.com/Alioune930/tictactrip-justify-api.git
cd tictactrip-justify-api

2 - Installer les dépendances :
npm install

3 - Lancer le serveur en mode développement :
npm run dev
Le serveur tourne par défaut sur le port 3000

Endpoints
POST /api/token

Génère un token unique pour l’API.

Headers : aucun

Body JSON :
{
  "email": "foo@bar.com"
}
Réponse :
{
  "token": "xxxx-xxxx-xxxx-xxxx"
}

POST /api/justify

Justifie le texte sur des lignes de 80 caractères.

Headers :
Authorization: Bearer <TOKEN>
Content-Type: text/plain

Body : texte brut (plusieurs phrases possibles)

Réponse : texte justifié

Erreur 402 : si la limite de 80 000 mots/jour est dépassée

Exemple PowerShell

Récupérer un token :
Invoke-RestMethod -Uri http://localhost:3000/api/token -Method POST -Body '{"email":"foo@bar.com"}' -ContentType "application/json"

Justifier un texte :
$body = "Ceci est un texte de test pour vérifier la justification sur 80 caractères."
Invoke-RestMethod -Uri http://localhost:3000/api/justify -Method POST -Headers @{ "Authorization" = "Bearer <TOKEN>" } -Body $body -ContentType "text/plain"

Développement

Fichiers principaux :

src/server.ts               : serveur Express
src/routes/token.route.ts  : génération des tokens
src/routes/justify.route.ts : justification du texte
src/services/token.service.ts : gestion des tokens et limites
