let bookReviewDTO = require('../dto/bookReviewDTO');

class bookReviewDTOBuilder {
    constructor() {
        this.username = null;
        this.review = null;
        this.reviewId = null;
    }
    /**
     * @param username
     * @returns {bookReviewDTOBuilder}
     */
    setUsername(username) {
        this.username = username;
        return this;
    }

    /**
     * @param review
     * @returns {bookReviewDTOBuilder}
     */
    setReview(review) {
        this.review = review;
        return this
    }

    /**
     * @param reviewId
     * @returns {bookReviewDTOBuilder}
     */
    setReviewId(reviewId) {
        this.reviewId = reviewId;
        return this;
    }

    build() {
        if (Object.values(this).some(value => value === null)) {
            throw new Error('One or more fields are null');
        }

        return new bookReviewDTO(this.username, this.review, this.reviewId);
    }
}

module.exports = bookReviewDTOBuilder;