/**
 * @swagger
 * /api/token:
 *   post:
 *     summary: Génère un token d'accès
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token généré
 */

import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';


const router = Router();

// Stockage simple des tokens en mémoire
export const tokens: Record<string, string> = {};

// Endpoint pour créer un token
router.post('/', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const token = uuidv4();
  tokens[email] = token;
  res.json({ token });
});

export { router as tokenRouter };
