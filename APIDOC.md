# API Documentation

## Overview

This document describes the available endpoints in the server application. The API provides functionalities to fetch information about books and authors, including details about book titles, publication dates, character names, and author names.

### Base URL

All endpoints are accessible at: **http://localhost:8000**


## Endpoints

### 1. Get All Books with Authors and Characters

Fetches a list of all books with associated authors and characters.

- **URL**: `/api`
- **Method**: `GET`
- **Response Format**: Plain text

#### Success Response

- **Code**: `200 OK`

- **Content**:
```json
Books and Characters Information:
Book Title: The Last Horizon
Published Date: 05/10/2022
Character Name: Ethan Anderson
Author Name: Liam White

Book Title: Shadows Of Tomorrow
Published Date: 08/03/2022
Character Name: Olivia Carter
Author Name: Mia King
```

#### Error Response

- **Code**: `500 Internal Server Error`

### 2. Get All Books by Author ID

Fetches a list of books associated with a specific author using their `author_id`.

- **URL**: `/api/author=:author_id`
- **Method**: `GET`
- **URL Parameters**:
- `author_id` (integer): The ID of the author whose books should be retrieved.

- **Response Format**: JSON

#### Success Response

- **Code**: `200 OK`
- **Content**:
```json
  {
    "book_title": "[Book Title]",
    "publication_date": "[Publication Date]",
    "author_name": "[Author Name]"
  },
  {
    "book_title": "[Book Title]",
    "publication_date": "[Publication Date]",
    "author_name": "[Author Name]"
  }
```

## All Error Responses

#### Error Response 404

- **Code**: `404 Bad Request`
- **Content**: Author ID is required.

#### Error Response 404

- **Code**: `404 Not Found`
- **Content**: No books found for the given author or the given author does not exist.

#### Error Response 500

- **Code**: `500 Internal Server Error`
- **Content**: Internal Server Error



