import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const secretKey = process.env.SECRET_KEY;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
}

export function generateToken(user) {
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign({ userId: user._id.toString(), role: user.role }, secretKey, { expiresIn: "1h" });
}
