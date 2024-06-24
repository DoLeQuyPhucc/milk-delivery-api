import jwt from "jsonwebtoken";

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
    console.log("Decoded token:", user);
    req.user = user;
    next();
  });
}



export function generateToken(user) {
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
}
