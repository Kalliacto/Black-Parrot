export const getEndings = (num, word) => {
    const res = num % 10;
    if (res === 1) {
        return ` ${word}`;
    } else if (1 < res && res < 5) {
        return ` ${word}а`;
    } else if (num > 5 || !num) {
        return ` ${word}ов`;
    }
};

export const productRating = (product) => {
    if (!product.reviews || !product.reviews.length) {
        return 0;
    }
    const res = product.reviews.reduce((acc, el) => (acc += el.rating), 0);
    return Math.round(res / product.reviews.length);
};