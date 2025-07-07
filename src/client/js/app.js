let movies = [];

// Fetch movies from API
async function fetchMovies(search = '') {
    try {
        // Show loading state
        if (search) {
            document.getElementById('moviesList').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <p class="text-gray">Searching for "${search}"...</p>
                </div>
            `;
        }

        const url = search 
            ? `/api/movies?search=${encodeURIComponent(search)}`
            : '/api/movies';
        const response = await fetch(url);
        const data = await response.json();
        movies = data;
        renderMovies(search);
    } catch (error) {
        console.error('Error fetching movies:', error);
        document.getElementById('moviesList').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">❌</div>
                <p class="text-gray">Error loading movies. Please try again.</p>
            </div>
        `;
    }
}

// Add movie
async function addMovie(name, producer, releaseDate) {
    try {
        const response = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, producer, releaseDate }),
        });
        
        if (response.ok) {
            document.getElementById('movieForm').reset();
            fetchMovies();
        } else {
            alert('Error adding movie');
        }
    } catch (error) {
        console.error('Error adding movie:', error);
        alert('Error adding movie');
    }
}

// Render movies
function renderMovies(searchTerm = '') {
    const moviesList = document.getElementById('moviesList');
    const movieCount = document.getElementById('movieCount');
    
    movieCount.textContent = movies.length;
    
    if (movies.length === 0) {
        const emptyMessage = searchTerm 
            ? `No movies found for "${searchTerm}". Try a different search term.`
            : 'No movies found. Add some movies to get started!';
        
        moviesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">${searchTerm ? '🔍' : '🎬'}</div>
                <p class="text-gray">${emptyMessage}</p>
                ${searchTerm ? '<p class="text-gray" style="margin-top: 10px; font-size: 14px;">Try searching by movie name or producer name.</p>' : ''}
            </div>
        `;
        return;
    }
    
    moviesList.innerHTML = `
        <div class="movies-grid">
            ${movies.map(movie => `
                <div class="movie-item">
                    <h3 class="movie-title">${highlightSearchTerm(movie.name, searchTerm)}</h3>
                    <p class="movie-details">
                        <span class="detail-icon">👨‍💼</span>
                        Producer: ${highlightSearchTerm(movie.producer, searchTerm)}
                    </p>
                    <p class="movie-details">
                        <span class="detail-icon">📅</span>
                        Release Date: ${new Date(movie.releaseDate).toLocaleDateString()}
                    </p>
                </div>
            `).join('')}
        </div>
    `;
}

// Highlight search terms in results
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(255, 255, 0, 0.3); padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

// Event listeners
document.getElementById('movieForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('movieName').value;
    const producer = document.getElementById('producerName').value;
    const releaseDate = document.getElementById('releaseDate').value;
    addMovie(name, producer, releaseDate);
});

// Search form submission
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    fetchMovies(searchTerm);
    toggleClearButton(searchTerm);
});

// Real-time search as you type
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    fetchMovies(searchTerm);
    toggleClearButton(searchTerm);
});

// Clear search functionality
document.getElementById('clearSearch').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    fetchMovies('');
    toggleClearButton('');
});

// Toggle clear button visibility
function toggleClearButton(searchTerm) {
    const clearBtn = document.getElementById('clearSearch');
    if (searchTerm.trim().length > 0) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
}

// Load movies on page load
fetchMovies();