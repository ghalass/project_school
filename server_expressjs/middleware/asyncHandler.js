// middleware/asyncHandler.js

// Le asyncHandler est un wrapper pour les fonctions
// asynchrones de tes routes,
// afin de ne pas avoir à mettre try/catch partout.

/**
 * Le asyncHandler est un wrapper pour les fonctions
 * asynchrones de tes routes,
 * afin de ne pas avoir à mettre try/catch partout.
 * @param {*} fn
 * @returns
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
