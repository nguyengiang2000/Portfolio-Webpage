CREATE TABLE "author" (
	"author_id"	INTEGER NOT NULL UNIQUE,
	"author_name"	TEXT NOT NULL,
	"dob"	TEXT,
	"bio"	TEXT,
	"gender"	TEXT NOT NULL,
	"location"	TEXT NOT NULL,
	PRIMARY KEY("author_id" AUTOINCREMENT)
);

CREATE TABLE "book" (
	"book_id"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT NOT NULL,
	"author_id"	INTEGER NOT NULL,
	"character_id"	INTEGER NOT NULL,
	"publish_date"	TEXT NOT NULL,
	"publisher_id"	INTEGER NOT NULL,
	PRIMARY KEY("book_id" AUTOINCREMENT),
	CONSTRAINT "author" FOREIGN KEY("author_id") REFERENCES "author"("author_id"),
	CONSTRAINT "character" FOREIGN KEY("character_id") REFERENCES "character"("character_id"),
	CONSTRAINT "publisher" FOREIGN KEY("publisher_id") REFERENCES "publisher"("publisher_id")
);

CREATE TABLE "character" (
	"character_id"	INTEGER NOT NULL UNIQUE,
	"fullname"	TEXT NOT NULL,
	"dob"	TEXT,
	"location"	TEXT NOT NULL,
	"gender"	TEXT NOT NULL,
	PRIMARY KEY("character_id" AUTOINCREMENT)
);

CREATE TABLE "publisher" (
	"publisher_id"	INTEGER NOT NULL UNIQUE,
	"publisher_name"	TEXT NOT NULL,
	PRIMARY KEY("publisher_id" AUTOINCREMENT)
);