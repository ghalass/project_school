export const cookieConfig = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true seulement si HTTPS
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  path: "/",
});