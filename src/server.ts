import express from 'express';
import { tokenRouter } from './routes/token.route';
import { justifyRouter } from './routes/justify.route';

const app = express();
const PORT = 3000;

// Pour recevoir JSON
app.use(express.json());

// Pour recevoir du texte brut (text/plain)
app.use(express.text({ type: 'text/plain' }));

// Routes
app.use('/api/token', tokenRouter);
app.use('/api/justify', justifyRouter);

// Route de test
app.get('/', (_req, res) => {
  res.send('API is running');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
