/**
 * Types partagés entre apps/web et apps/server.
 * Garder ce paquet sans dépendance d'exécution (types et constantes uniquement).
 */

/** Plateformes d'écoute vers lesquelles Sillon redirige (pas d'écoute intégrée). */
export const StreamingPlatform = {
  Spotify: "SPOTIFY",
  Deezer: "DEEZER",
  AppleMusic: "APPLE_MUSIC",
  YouTube: "YOUTUBE",
  SoundCloud: "SOUNDCLOUD",
} as const;

export type StreamingPlatform = (typeof StreamingPlatform)[keyof typeof StreamingPlatform];

/** Format d'erreur renvoyé par l'API. */
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

/** Réponse de GET /api/health. */
export interface HealthResponse {
  status: "ok";
  uptime: number;
}
