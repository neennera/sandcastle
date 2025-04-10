import JWTVerify from '../../routes/api/jwtVerify';
import { BASE_URL } from '$env/static/private';

/**
 * Logs error messages for debugging purposes.
 * @param {string} message
 */
export function showingErrorDummy(message) {
    console.error(message);
}

/**
 * Sets a JWT token for the user.
 * @param {string} userId - The ID of the user.
 */
export async function setToken(userId) {
    const existingToken = localStorage.getItem('jwtToken');
    if (existingToken) {
        const isTokenValid = await JWTVerify(`Bearer ${existingToken}`);
        if (isTokenValid) {
            return; // Token is valid, no need to fetch a new one
        }
    }

    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });

        if (response.status === 404) {
            showingErrorDummy('User not found (404).');
            return;
        }

        if (!response.ok) {
            showingErrorDummy(`Failed to set token: ${response.statusText}`);
            return;
        }

        const { token } = await response.json();
        localStorage.setItem('jwtToken', token);
    } catch (err) {
        if (err instanceof Error) {
            showingErrorDummy(err.message);
        } else {
            showingErrorDummy('An unknown error occurred while setting the token.');
        }
        throw new Error('Cannot set the token');
    }
}
