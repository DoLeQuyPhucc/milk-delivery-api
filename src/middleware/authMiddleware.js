import jwt from "jsonwebtoken";

// Middleware kiểm tra token
export function authenticateToken(req, res, next) {
  const secretKey = process.env.SECRET_KEY;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error("Error verifying token:", err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
