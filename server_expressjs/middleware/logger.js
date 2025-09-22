// middleware/logger.js

export const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const ip = req.headers["x-forwarded-for"] || req.ip;
    console.log(
      `${req.method} ${req.path} [${res.statusCode}] - ${duration}ms - IP: ${ip}`
    );
  });

  next();
};
