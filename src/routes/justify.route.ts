import { Router, Request, Response } from 'express';
import { tokens } from './token.route';
import { canUseToken } from '../services/token.service';

const router = Router();

/**
 * Justifie un texte sur une largeur donnée (par défaut 80 caractères)
 */
function justifyText(text: string, lineWidth: number = 80): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine: string[] = [];

  for (const word of words) {
    const lineLength = currentLine.join(' ').length;
    if (lineLength + word.length + (currentLine.length > 0 ? 1 : 0) > lineWidth) {
      // Construire la ligne justifiée
      let line: string = currentLine.join(' ');
      const extraSpaces = lineWidth - line.length;

      if (extraSpaces > 0 && currentLine.length > 1) {
        const spacesBetween = Math.floor(extraSpaces / (currentLine.length - 1));
        let remainder = extraSpaces % (currentLine.length - 1);

        // Fix TypeScript strict : currentLine[0]! est jamais undefined
        line = currentLine[0]!;

        for (let i = 1; i < currentLine.length; i++) {
          let space = ' '.repeat(1 + spacesBetween);
          if (remainder > 0) {
            space += ' ';
            remainder--;
          }
          line += space + currentLine[i];
        }
      }

      lines.push(line);
      currentLine = [];
    }

    currentLine.push(word);
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.join(' '));
  }

  return lines.join('\n');
}

// Endpoint /api/justify
router.post('/', (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.replace('Bearer ', '');
  if (!Object.values(tokens).includes(token)) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const text = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid text' });
  }

  const wordsCount = text.split(/\s+/).length;
  if (!canUseToken(token, wordsCount)) {
    return res.status(402).json({ error: 'Word limit exceeded' });
  }

  const justified = justifyText(text, 80);
  res.setHeader('Content-Type', 'text/plain');
  res.send(justified);
});

export { router as justifyRouter };
