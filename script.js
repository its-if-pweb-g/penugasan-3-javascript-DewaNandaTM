document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    document.getElementById('nameError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('messageError').classList.add('hidden');
    document.getElementById('successMessage').classList.add('hidden');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let hasError = false;

    if (!name) {
        document.getElementById('nameError').classList.remove('hidden');
        hasError = true;
    }
    if (!email) {
        document.getElementById('emailError').classList.remove('hidden');
        hasError = true;
    }
    if (!message) {
        document.getElementById('messageError').classList.remove('hidden');
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const submitButton = document.getElementById('submitButton');
    submitButton.innerHTML = `<svg class="animate-spin h-5 w-5 mr-3 border-4 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>`;
    submitButton.disabled = true;

    try {
        const response = await fetch('https://debug.nafkhanzam.com/web-programming-e03', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
            mode: 'no-cors'
        });

        document.getElementById('successMessage').classList.remove('hidden');
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        submitButton.innerHTML = 'Kirim';
        submitButton.disabled = false;
    }
});

const saveInput = document.getElementById('saveInput');
window.addEventListener('load', () => {
    const savedText = localStorage.getItem('textfield');
    if (savedText) {
        saveInput.value = savedText;
    }
});

saveInput.addEventListener('input', () => {
    localStorage.setItem('textfield', saveInput.value);
});
