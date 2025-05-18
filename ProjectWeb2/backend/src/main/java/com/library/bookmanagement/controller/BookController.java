package com.library.bookmanagement.controller;

import com.library.bookmanagement.model.Book;
import com.library.bookmanagement.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class BookController {

    private final BookRepository bookRepository;

    @Autowired
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam(required = false) String author,
                                  @RequestParam(required = false) String title) {
        if (author != null && !author.isEmpty()) {
            return bookRepository.findByAuthor(author);
        } else if (title != null && !title.isEmpty()) {
            return bookRepository.findByTitle(title);
        }
        return bookRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book savedBook = bookRepository.save(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        if (bookRepository.deleteById(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}