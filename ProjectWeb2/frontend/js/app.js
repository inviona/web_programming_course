// Configuration
const API_URL = 'http://localhost:8080/api/books';

// DOM Elements
const bookForm = document.getElementById('add-book-form');
const booksList = document.getElementById('books-list');
const noBooks = document.getElementById('no-books');
const searchInput = document.getElementById('search-input');
const notificationArea = document.getElementById('notification-area');

// Book collection
let books = [];

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notificationArea.innerHTML = '';
    notificationArea.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Fetch all books
async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        
        books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        showNotification('Error loading books. Please try again later.', 'error');
    }
}

// Render books to table
function renderBooks(booksToRender) {
    booksList.innerHTML = '';
    
    if (booksToRender.length === 0) {
        noBooks.style.display = 'block';
        return;
    }
    
    noBooks.style.display = 'none';
    
    booksToRender.forEach(book => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.genre}</td>
            <td>
                <button class="btn btn-delete" data-id="${book.id}">Delete</button>
            </td>
        `;
        
        booksList.appendChild(row);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            deleteBook(bookId);
        });
    });
}

// Add a new book
async function addBook(book) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add book');
        }
        
        const newBook = await response.json();
        books.push(newBook);
        renderBooks(books);
        showNotification('Book added successfully!');
        
        // Reset form
        bookForm.reset();
        
    } catch (error) {
        console.error('Error adding book:', error);
        showNotification('Error adding book. Please try again.', 'error');
    }
}

// Delete a book
async function deleteBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
        
        // Remove book from array
        books = books.filter(book => book.id !== id);
        renderBooks(books);
        showNotification('Book deleted successfully!');
        
    } catch (error) {
        console.error('Error deleting book:', error);
        showNotification('Error deleting book. Please try again.', 'error');
    }
}

// Filter books
function filterBooks(searchTerm) {
    if (!searchTerm) {
        renderBooks(books);
        return;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    
    renderBooks(filteredBooks);
}

// Form validation
function validateForm() {
    let valid = true;
    
    // Title validation
    const title = document.getElementById('title');
    const titleError = document.getElementById('title-error');
    
    if (!title.value.trim()) {
        titleError.style.display = 'block';
        valid = false;
    } else {
        titleError.style.display = 'none';
    }
    
    // Author validation
    const author = document.getElementById('author');
    const authorError = document.getElementById('author-error');
    
    // Author should not contain symbols (except spaces, dots, and hyphens)
    const authorRegex = /^[a-zA-Z\s.-]+$/;
    if (!author.value.trim() || !authorRegex.test(author.value)) {
        authorError.style.display = 'block';
        valid = false;
    } else {
        authorError.style.display = 'none';
    }
    
    // Year validation
    const year = document.getElementById('year');
    const yearError = document.getElementById('year-error');
    
    const yearValue = parseInt(year.value);
    if (isNaN(yearValue) || yearValue < 1000 || yearValue > new Date().getFullYear()) {
        yearError.style.display = 'block';
        valid = false;
    } else {
        yearError.style.display = 'none';
    }
    
    // Genre validation
    const genre = document.getElementById('genre');
    const genreError = document.getElementById('genre-error');
    
    if (!genre.value) {
        genreError.style.display = 'block';
        valid = false;
    } else {
        genreError.style.display = 'none';
    }
    
    return valid;
}

// Event Listeners
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const newBook = {
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        year: parseInt(document.getElementById('year').value),
        genre: document.getElementById('genre').value
    };
    
    addBook(newBook);
});

searchInput.addEventListener('input', function() {
    filterBooks(this.value.trim());
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    fetchBooks();
});