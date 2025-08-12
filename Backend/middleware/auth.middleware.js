import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization; // Note: headers (plural)
    const token = authHeader && authHeader.split(' ')[1]; // Get token after 'Bearer '

    if (!token) {
        return res.status(403).send('Token not found');
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (e) {
        return res.status(401).send('Invalid token');
    }
}
