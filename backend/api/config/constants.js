const CORS_OPTIONS = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:54699",
  ],
  credentials: true,
};

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 15 * 24 * 60 * 60 * 1000,
};

module.exports = { CORS_OPTIONS, COOKIE_OPTIONS };
