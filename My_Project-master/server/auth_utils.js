const jwt = require ('jsonwebtoken');

function authenticationIsOk(req,user){
    const body =req.body;

    return(body.email == user.email) && (body.password == user.password)
}

const secret = 'estersol188';

function creatToken(user){
    const validTimeSec = 30*60; // --- token expire after 20 minutes
    const expirationDate =Date.now() / 1000 + validTimeSec
    const token = jwt.sign({userId: user.email, exp: expirationDate}, secret )
    return token;
}



module.exports = {
    authenticationIsOk: authenticationIsOk ,
    creatToken: creatToken , 
    secret: secret 
};