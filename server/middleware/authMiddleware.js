import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "NO token provided" });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode)
        req.user = decode;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" })
    }
};