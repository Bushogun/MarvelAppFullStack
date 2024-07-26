import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

export default authenticateJWT;
