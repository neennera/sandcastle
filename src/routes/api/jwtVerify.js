import jwt, { verify } from 'jsonwebtoken';
import 'dotenv/config';
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Verifies a JWT token from the Authorization header.
 * @param {string} authHeader - The Authorization header containing the token.
 * @returns {boolean} - Returns true if the token is valid, false otherwise.
 */
export default function JWTVerify(authHeader) {

    // console.log(SECRET_KEY);
    
    if (!SECRET_KEY) {
        return false; // No secret key available
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false; // No token provided
    }

    const token = authHeader.split(' ')[1];
    // console.log(SECRET_KEY, token);
    
    // Verify the token
    try {
        jwt.verify(token, SECRET_KEY);
        return true; // Token is valid
    } catch (err) {
        return false; // Token is invalid
    }
}