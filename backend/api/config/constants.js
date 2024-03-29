const CORS_OPTIONS = {
  origin: ["https://job-trek.onrender.com"],
  credentials: true,
};

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 15 * 24 * 60 * 60 * 1000, // expires after 15 days
};

module.exports = { CORS_OPTIONS, COOKIE_OPTIONS };
