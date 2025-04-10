import JWTVerify from '../../routes/api/jwtVerify';
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:xxxx';

export function showingErrorDummy() { }

/**
 * @param {any} userId
 */

//How do we get userId btw ;w;
export async function setToken(userId) {
    const existingToken = localStorage.getItem('jwtToken');
    if (existingToken) {
        const isTokenValid = await JWTVerify(existingToken);
        if (isTokenValid) {
            return;
        }
    }

    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });

        if (response.status === 404) {
            showingErrorDummy();
            return;
        }

        if (!response.ok) {
            showingErrorDummy();
            return;
        }

        const { token } = await response.json();
        localStorage.setItem('jwtItem', token);
    } catch (err) {
        throw new Error('Cannot get the token');
    }
}
