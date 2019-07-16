import jwt from "jsonwebtoken";

interface UserToken {
    userId: Number, email: String,
}
const AuthMiddleware = (req, res, next) => {
    const authHeader: string = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token: string = req.get('Authorization').split(' ')[1];
    if (!token || token == '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken: UserToken;
    try {
        decodedToken = <UserToken>jwt.verify(token, 'thisismyprivatekey')
    }
    catch (exp) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    } else {
        req.isAuth = true;
        req.userId = decodedToken.userId;
        return next();
    }
}

export default AuthMiddleware;