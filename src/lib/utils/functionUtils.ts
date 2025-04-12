import { goto } from '$app/navigation';

export function navigateToPage(page: string) {
    const homebtn = document.getElementById('home-button');
    if (homebtn) {
        homebtn.style.display = 'block'; // Make the home button visible
    }
    goto(page); // Navigate to the specified page
}