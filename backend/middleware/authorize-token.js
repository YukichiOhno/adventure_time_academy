const jwt = require('jsonwebtoken');

const authorizeToken = (req, res, next) => {
    // check for token in cookies
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).json({ message: 'token is missing' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'invalid token' });
        }
        
        // attach user information (acct_username, acct_id, acct_identity) to request object
        const { acct_username, acct_id, acct_identity } = decodedToken;
        req.user = { acct_username, acct_id, acct_identity };
        next();
    });
};


module.exports = authorizeToken;