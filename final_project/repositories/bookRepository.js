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
        return Object.values(db).filter(book => book.author === author);
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

