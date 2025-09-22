/**
 * Middleware de validation avec Yup
 * @param {object} schema - Schéma Yup pour valider req.body
 */
export const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body, {
      abortEarly: false, // retourne tous les messages d'erreur
      stripUnknown: true, // supprime les champs non définis dans le schema
    });
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};
