document.addEventListener('DOMContentLoaded', () => {
    // Handle Register Form
    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ username, password })
            });
            const data = await response.json();
            document.getElementById('register-message').textContent = data.message;
        } catch (error) {
            document.getElementById('register-message').textContent = 'Error: ' + error.message;
        }
    });

    // Handle Login Form
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ username, password })
            });
            const data = await response.json();
            document.getElementById('login-message').textContent = data.message;
        } catch (error) {
            document.getElementById('login-message').textContent = 'Error: ' + error.message;
        }
    });

    // Handle Add Book Form
    document.getElementById('add-book-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('book-title').value;
        const author = document.getElementById('book-author').value;
        const genre = document.getElementById('book-genre').value;
        const summary = document.getElementById('book-summary').value;

        try {
            const response = await fetch('/add_book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ title, author, genre, summary })
            });
            const data = await response.json();
            document.getElementById('add-book-message').textContent = data.message;
        } catch (error) {
            document.getElementById('add-book-message').textContent = 'Error: ' + error.message;
        }
    });

    // Handle Log Rating Form
    document.getElementById('log-rating-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = document.getElementById('rating-user-id').value;
        const bookId = document.getElementById('rating-book-id').value;
        const rating = document.getElementById('rating-value').value;
        const review = document.getElementById('rating-review').value;

        try {
            const response = await fetch('/log_rating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ user_id: userId, book_id: bookId, rating, review })
            });
            const data = await response.json();
            document.getElementById('log-rating-message').textContent = data.message;
        } catch (error) {
            document.getElementById('log-rating-message').textContent = 'Error: ' + error.message;
        }
    });

    // Handle Set Preferences Form
    document.getElementById('preferences-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = document.getElementById('preferences-user-id').value;
        const preferredGenres = document.getElementById('preferences-genres').value;
        const preferredAuthors = document.getElementById('preferences-authors').value;

        try {
            const response = await fetch('/set_preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ user_id: userId, preferred_genres: preferredGenres, preferred_authors: preferredAuthors })
            });
            const data = await response.json();
            document.getElementById('preferences-message').textContent = data.message;
        } catch (error) {
            document.getElementById('preferences-message').textContent = 'Error: ' + error.message;
        }
    });

    // Handle Get Recommendations Form
    document.getElementById('recommendations-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = document.getElementById('recommendations-user-id').value;

        try {
            const response = await fetch('/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ user_id: userId })
            });
            const data = await response.json();

            const recommendationsList = document.getElementById('recommendations-list');
            recommendationsList.innerHTML = '';

            if (data.recommendations) {
                data.recommendations.forEach(book => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${book.title}</strong> by ${book.author}<br>Genre: ${book.genre}<br>Summary: ${book.summary}`;
                    recommendationsList.appendChild(li);
                });
            } else {
                recommendationsList.innerHTML = `<li>${data.message}</li>`;
            }
        } catch (error) {
            document.getElementById('recommendations-list').innerHTML = `<li>Error: ${error.message}</li>`;
        }
    });
});
