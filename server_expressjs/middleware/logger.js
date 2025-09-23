// middleware/logger.js

export const logger = (req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.path} [${res.statusCode}]`);
  });

  next();
};
