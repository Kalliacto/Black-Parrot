import { refreshToken } from './utils';

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
    },
};

const onResponse = (data) => {
    return data.ok ? data.json() : data.json().then((data) => Promise.reject(data));
};

class Api {
    constructor(data) {
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
    }

    getAllProducts() {
        return fetch(`${this.baseUrl}/products`, {
            method: 'GET',
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }

    searchProducts(path) {
        return fetch(`${this.baseUrl}/products/search?query=${path}`, {
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }

    editLikeCard(id, cardLiked) {
        return fetch(`${this.baseUrl}/products/likes/${id}`, {
            method: cardLiked ? 'DELETE' : 'PUT',
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }
    getOneProduct(id) {
        return fetch(`${this.baseUrl}/products/${id}`, {
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }

    getAllReviews() {
        return fetch(`${this.baseUrl}/products/review`, {
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }

    getProductAllReviews(id) {
        return fetch(`${this.baseUrl}/products/review/${id}`, {
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }

    addNewReview(id, body) {
        return fetch(`${this.baseUrl}/products/review/${id}`, {
            method: 'POST',
            headers: refreshToken(this.headers),
            body: JSON.stringify(body),
        }).then(onResponse);
    }

    deleteProductReview(productId, reviewId) {
        return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
            method: 'DELETE',
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }
}

export const api = new Api(config);
