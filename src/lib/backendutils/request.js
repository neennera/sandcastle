import { BASE_URL } from '$env/static/private';

/**
 * @returns {Promise<any>}
 */
export async function getRandomSandCastles() {
    try {
        const response = await fetch(`${BASE_URL}/sandcastles/random`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sandcastles: ${response.statusText}`);
        }

        const items = await response.json();
        return items;
    } catch (err) {
        if (err instanceof Error) throw new Error(`${err.message}`);
        else throw new Error("An unknow error orccur");
    }
}