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
    // Transformer les erreurs pour avoir { field: message }
    const formattedErrors = {};
    if (err.inner && err.inner.length > 0) {
      err.inner.forEach((e) => {
        if (e.path && !formattedErrors[e.path]) {
          formattedErrors[e.path] = e.message;
        }
      });
    }

    return res.status(400).json({ success: false, errors: formattedErrors });
  }
};

// /**
//  * Middleware de validation avec Yup
//  * @param {object} schema - Schéma Yup pour valider req.body
//  */
// export const validate = (schema) => async (req, res, next) => {
//   try {
//     req.body = await schema.validate(req.body, {
//       abortEarly: false, // retourne tous les messages d'erreur
//       stripUnknown: true, // supprime les champs non définis dans le schema
//     });
//     next();
//   } catch (err) {
//     return res.status(400).json({ success: false, errors: err.errors });
//   }
// };
