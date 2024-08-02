const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
JWT_SEC = process.env.JWT_SEC
// TODO: Try adding private and public key for each user rather than or along with access token

const { TokenExpiredError, JsonWebTokenError } = jwt;

const catchTokenError = (err, res) => {
    if(err instanceof TokenExpiredError){
        return res.status(401).json(err);
    }

    if (err instanceof JsonWebTokenError){
        return res.status(403).json({ error: err });
    }
    return res.status(401).json({message:"Unauthorized"});
}

const verifyToken = (req, res, next) => {
    const authToken = req.headers.token.split(" ")[1];
    // console.log(authToken);
    if (authToken) {
        jwt.verify(authToken, JWT_SEC,(err, user) => {
            if (err) catchTokenError(err, res);
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json('No Token Provided');
    }

};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === 'admin')
            next();
        else{
            return res.status(403).json('You are not admin');
        }
    });
};

module.exports = verifyTokenAndAuthorization;