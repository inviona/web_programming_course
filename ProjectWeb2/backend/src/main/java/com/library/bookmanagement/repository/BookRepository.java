
package com.library.bookmanagement.repository;

import com.library.bookmanagement.model.Book;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class BookRepository {
    private final List<Book> books = new ArrayList<>();

    // Initialize with some sample books
    public BookRepository() {
        books.add(new Book("1984", "George Orwell", 1949, "Novel"));
        books.add(new Book("To Kill a Mockingbird", "Harper Lee", 1960, "Novel"));
        books.add(new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Novel"));
        books.add(new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 1997, "Fantasy"));
        books.add(new Book("The Da Vinci Code", "Dan Brown", 2003, "Thriller"));
    }

    public List<Book> findAll() {
        return new ArrayList<>(books);
    }

    public Optional<Book> findById(String id) {
        return books.stream()
                .filter(book -> book.getId().equals(id))
                .findFirst();
    }

    public List<Book> findByAuthor(String author) {
        return books.stream()
                .filter(book -> book.getAuthor().toLowerCase().contains(author.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Book> findByTitle(String title) {
        return books.stream()
                .filter(book -> book.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Book save(Book book) {
        // If book doesn't have an ID, generate one
        if (book.getId() == null || book.getId().isEmpty()) {
            book.setId(java.util.UUID.randomUUID().toString());
        } else {
            // If book exists, remove it first
            books.removeIf(b -> b.getId().equals(book.getId()));
        }
        books.add(book);
        return book;
    }

    public boolean deleteById(String id) {
        return books.removeIf(book -> book.getId().equals(id));
    }
}