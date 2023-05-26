const CORS_OPTIONS = {
  origin: ["https://job-trek.netlify.app"],
  credentials: true,
};

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 15 * 24 * 60 * 60 * 1000, // expires after 15 days
};

module.exports = { CORS_OPTIONS, COOKIE_OPTIONS };
