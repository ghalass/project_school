// middleware/allowedRoles.js

/**
 * Middleware pour restreindre l'accès aux rôles spécifiés
 * @param {string[]} roles - Liste des rôles autorisés (ex: ["SUPER_ADMIN", "ADMIN"])
 */
const allowedRoles = (roles) => {
  return (req, res, next) => {
    const userRole = req?.user?.role;

    if (!userRole) {
      return res
        .status(403)
        .json({ error: "Rôle utilisateur introuvable ou non authentifié" });
    }

    if (!roles.includes(userRole)) {
      const allowedRolesStr = roles.map((r) => r.replace("_", " ")).join(", ");
      return res.status(403).json({
        error: `Accès refusé. Autorisé uniquement pour : [${allowedRolesStr}]. Votre rôle : [${userRole.replace(
          "_",
          " "
        )}]`,
      });
    }

    next();
  };
};

export default allowedRoles;
