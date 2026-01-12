import express from 'express';
import { tokenRouter } from './routes/token.route';
import { justifyRouter } from './routes/justify.route';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

