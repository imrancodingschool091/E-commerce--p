import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Header missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // Token extract
    const token = authHeader.split(" ")[1];

    // Verify access token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach userId to request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
