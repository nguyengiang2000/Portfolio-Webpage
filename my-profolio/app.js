/** 
  Name: Nguyen Giang
  Date: Nov 11, 2024
  This is the server.js.
**/


"use strict";

const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const express = require("express");

const app = express();
const port = 8000;

// Function to establish a connection to the SQLite database
async function getDBConnection() {
    const db = await sqlite.open({
        filename: "db-sql.db",
        driver: sqlite3.Database,
    });
    return db;
}

// Show all books with their author names and characters
app.get("/allbooks", async (req, res) => {
    try {
        // Establish a database connection
        const db = await getDBConnection();

        // Query to get book title, published date, character names, and author names
        const books = await db.all(`
            SELECT 
                book.title AS book_title,
                book.publish_date AS publication_date,
                character.fullname AS character_name,
                author.author_name AS author_name
            FROM 
                book
            JOIN 
                author ON book.author_id = author.author_id
            JOIN 
                character ON character.character_id = book.book_id;
        `);

        // Formatting the response text
        let responseText = "Books and Characters Information:\n";
        books.forEach((book) => {
            responseText += `Book Title: ${book.book_title}\n`;
            responseText += `Published Date: ${book.publication_date}\n`;
            responseText += `Character Name: ${book.character_name}\n`;
            responseText += `Author Name: ${book.author_name}\n`;
            responseText += "\n";
        });

        // Send the response as plain text
        res.type("text/plain").send(responseText);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Show all books for a specific author by author_id
app.get("/allbooks/author=:author_id", async (req, res) => {
    const { author_id } = req.params;

    if (!author_id) {
        return res.status(400).send("Author ID is required.");
    }

    try {
        // Establish a database connection
        const db = await getDBConnection();

        // Query to get books for a specific author by author_id
        const books = await db.all(`
            SELECT 
                book.title AS book_title,
                book.publish_date AS publication_date,
                author.author_name AS author_name
            FROM 
                book
            JOIN 
                author ON book.author_id = author.author_id
            WHERE 
                author.author_id = ?
        `, [author_id]);

        if (books.length === 0) {
            return res.status(404).send("No books found for the given author or the given author does not exist.");
        }

        // formatting the response text
        let responseText = `Books by Author ID ${author_id}:\n`;
        books.forEach((book) => {
            responseText += `Published Date: ${book.publish_date}\n`;
            responseText += `Author Name: ${book.author_name}\n`;
            responseText += "\n";
        });

        // Send the response as json
        res.json(books);
    } catch (error) {
        console.error("Error fetching books for the author:", error);
        res.status(500).send("Internal Server Error");
    }
});

// add new book to database
async function addNewBook(title, publishedDate, authorId, characterId, publisherId) {
    const db = await getDBConnection();
    try {
        // Author and Character, Publisher IDs can't be null for new book
        if (!authorId || !characterId || !publisherId) {
            throw new Error("Both author_id and character_id are required and cannot be null.");
        }

        //  check if these IDs exist in their respective tables ( 1 mean exist )
        const authorExists = await db.get("SELECT 1 FROM author WHERE author_id = ?", [authorId]);
        const characterExists = await db.get("SELECT 1 FROM character WHERE character_id = ?", [characterId]);
        const publisherExists = await db.get("SELECT 1 FROM publisher WHERE publisher_id = ?", [publisherId]);


        if (!authorExists) {
            throw new Error(`Author with ID ${authorId} does not exist.`);
        }

        if (!characterExists) {
            throw new Error(`Character with ID ${characterId} does not exist.`);
        }

        if (!publisherExists) {
            throw new Error(`Publisher with ID ${publisherId} does not exist.`);
        }


        // Insert new book into the Books table
        const result = await db.run(`
            INSERT INTO book (title, publish_date, author_id, character_id, publisher_id) 
            VALUES (?, ?, ?, ?, ?)
        `, [title, publishedDate, authorId, characterId, publisherId]);

        return result.lastID; 
    } catch (error) {
        console.error("Error inserting new book:", error);
        throw error;
    }
}

//server start in an async function
async function initialize() {
    try {
        // Add a new book to the database
        await addNewBook("The Worm Galaxy", "12/10/2024", 2, 8, 3);

        // Start the Express server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error initializing:", error);
    }
}

// start to run server
initialize();
