const jwt = require('jsonwebtoken');


module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.send('access Denied');

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.send('Invalid Token');
    }
}