TicTacTrip Justify API

Déploiement :
"""""URL publique (API déployée sur Render) : https://tictactrip-justify-api-alioune.onrender.com

Test sur interface Swagger :
 Accessible via :
   https://tictactrip-justify-api-alioune.onrender.com/api-docs
   Permet de visualiser l’API, générer un token et tester `/api/justify` directement depuis l’interface.""""""""


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
Le serveur tourne par défaut sur le port 3000 si lancé en local sinon rdv directement à cette adresse https://tictactrip-justify-api-alioune.onrender.com/

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

Justifier ce texte :
Invoke-RestMethod -Uri http://localhost:3000/api/justify -Method POST -Headers @{ "Authorization" = "Bearer <TOKEN>" } -ContentType "text/plain" -Body "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour."


Développement

Fichiers principaux :

src/server.ts               : serveur Express
src/routes/token.route.ts  : génération des tokens
src/routes/justify.route.ts : justification du texte
src/services/token.service.ts : gestion des tokens et limites

Déploiement:

URL publique (API déployée sur Render) : https://tictactrip-justify-api-alioune.onrender.com

Test sur interface Swagger :
 Accessible via :
   https://tictactrip-justify-api-alioune.onrender.com/api-docs
   Permet de visualiser l’API, générer un token et tester `/api/justify` directement depuis l’interface.
