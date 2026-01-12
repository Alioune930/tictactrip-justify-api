import express from 'express';
import cors from 'cors'; // <-- ajouter
import { tokenRouter } from './routes/token.route';
import { justifyRouter } from './routes/justify.route';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();
app.use(cors());


// ===== Middleware =====
app.use(cors()); // <-- autoriser toutes les origines
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));

// ===== Routes =====
app.use('/api/token', tokenRouter);
app.use('/api/justify', justifyRouter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Racine
app.get('/', (_req, res) => {
  res.send('API is running');
});

// ===== Port dynamique =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
