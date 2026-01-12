// src/services/token.service.ts

interface TokenUsage {
  wordsToday: number;
  lastUpdated: Date;
}

// Stockage en mémoire
export const tokenUsage: Record<string, TokenUsage> = {};

// Limite quotidienne
export const WORD_LIMIT = 80000;

// Fonction pour vérifier si le token peut ajouter ce nombre de mots
export function canUseToken(token: string, wordsToAdd: number): boolean {
  const now = new Date();
  const usage = tokenUsage[token];

  if (!usage) {
    tokenUsage[token] = { wordsToday: wordsToAdd, lastUpdated: now };
    return true;
  }

  const lastDay = usage.lastUpdated;
  if (
    now.getUTCFullYear() !== lastDay.getUTCFullYear() ||
    now.getUTCMonth() !== lastDay.getUTCMonth() ||
    now.getUTCDate() !== lastDay.getUTCDate()
  ) {
    // Nouveau jour, réinitialiser compteur
    usage.wordsToday = 0;
    usage.lastUpdated = now;
  }

  if (usage.wordsToday + wordsToAdd > WORD_LIMIT) {
    return false;
  }

  usage.wordsToday += wordsToAdd;
  return true;
}
