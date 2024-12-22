let db = require("../router/booksdb.js");

class BookRepository {
    /**
     * @param isbn
     * @returns {*}
     */
    getBookByIsbn(isbn)
    {
        return db[isbn];
    }

    /**
     * @param author
     * @returns {*}
     */
    getBookByAuthor(author)
    {
        const book = Object.values(db).filter(book => book.author === author);

        return book.length > 0 ? book : null;
    }

    /**
     * @returns {*}
     */
    getAllBooks()
    {
        return db;
    }
}

module.exports = new BookRepository();

