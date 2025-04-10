const BASE_URL = process.env.API_BASE_URL || 'http://localhost:xxxx';

export async function getRandomSandCastles() {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtItem')}`
            }
        });
        const items = await response.json();
        return items;
    }
    catch (err) {
        throw new Error("Cannot get random sandcastle");
    }
}