let db = require("../router/booksdb.js");

class BookRepository {
    /**
     * @returns {*}
     */
    getAllBooks()
    {
        return db;
    }

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
     *
     * @param title
     * @returns {*}
     */
    getBookByTitle(title)
    {
        const book = Object.values(db).filter(book => book.title === title);

        return book.length > 0 ? book : null;
    }

    /**
     * @param isbn
     * @returns {*|null}
     */
    getBookReviewsByIsbn(isbn)
    {
        return db[isbn] ? db[isbn].reviews : null;
    }
}

module.exports = new BookRepository();

