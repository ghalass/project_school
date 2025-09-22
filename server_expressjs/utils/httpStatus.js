const HttpStatus = Object.freeze({
  // ✅ 2xx : Success
  OK: 200, // Requête réussie, réponse standard pour un GET ou action sans création
  CREATED: 201, // Ressource créée (POST réussi, ex: création d’un user)
  ACCEPTED: 202, // Requête acceptée mais traitement asynchrone pas terminé
  NO_CONTENT: 204, // Requête réussie mais aucune donnée à renvoyer (souvent pour DELETE)

  // 🔀 3xx : Redirection
  MOVED_PERMANENTLY: 301, // Ressource déplacée définitivement (nouvelle URL)
  FOUND: 302, // Ressource temporairement à une autre URL
  NOT_MODIFIED: 304, // Utilisé pour le cache → ressource pas modifiée

  // ⚠️ 4xx : Client Errors
  BAD_REQUEST: 400, // Mauvaise requête (ex: données invalides, schéma non respecté)
  UNAUTHORIZED: 401, // Non authentifié (manque ou token invalide)
  FORBIDDEN: 403, // Authentifié mais pas autorisé (pas les droits nécessaires)
  NOT_FOUND: 404, // Ressource demandée inexistante
  CONFLICT: 409, // Conflit avec l’état actuel (ex: email déjà utilisé)
  UNPROCESSABLE_ENTITY: 422, // Données valides mais invalides en logique métier

  // 💥 5xx : Server Errors
  INTERNAL_SERVER_ERROR: 500, // Erreur générique côté serveur
  NOT_IMPLEMENTED: 501, // Fonctionnalité pas encore implémentée
  BAD_GATEWAY: 502, // Mauvaise réponse d’un serveur tiers
  SERVICE_UNAVAILABLE: 503, // Serveur indisponible (surcharge ou maintenance)
  GATEWAY_TIMEOUT: 504, // Temps d’attente dépassé pour un serveur tiers
});

export default HttpStatus;
