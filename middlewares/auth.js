import jwt from 'jsonwebtoken';
//middle para verificar JWT en rutas protegidas
export const authenticate = (req, res, next) => {
    const token = req.cookies.token ;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};