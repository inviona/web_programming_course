package com.library.bookmanagement.model;

import java.util.UUID;

public class Book {
    private String id;
    private String title;
    private String author;
    private int year;
    private String genre;

    public Book() {
        this.id = UUID.randomUUID().toString();
    }

    public Book(String title, String author, int year, String genre) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
}