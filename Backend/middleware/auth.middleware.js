import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.header.authorization?. split('') (1);
    if (!token) return res.status(403).send('Token not found');

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data;
            next();
        }catch (e) {
                res.status(481).send(e);
            
        }
    }    
