import { refreshToken } from './utils';

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
    },
};

const onResponse = (data) => {
    // return data.ok ? data.json() : Promise.reject(`Что-то пошло не так`);
    return data.ok ? data.json() : data.json().then((data) => Promise.reject(data));
};

class UserApi {
    constructor(data) {
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }

    signIn(data) {
        return fetch(`${this.baseUrl}/signin`, {
            headers: refreshToken(this.headers),
            method: 'POST',
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    signUp(data) {
        return fetch(`${this.baseUrl}/signup`, {
            headers: refreshToken(this.headers),
            method: 'POST',
            body: JSON.stringify(data),
        }).then(onResponse);
    }
    resetPass(data) {
        return fetch(`${this.baseUrl}/forgot-password`, {
            headers: refreshToken(this.headers),
            method: 'POST',
            body: JSON.stringify(data),
        }).then(onResponse);
    }
    resetPassWithToken(token, data) {
        return fetch(`${this.baseUrl}/password-reset/${token}`, {
            headers: refreshToken(this.headers),
            method: 'PATCH',
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    getUserInfoById(id) {
        return fetch(`${this.baseUrl}/users/${id}`, {
            method: 'GET',
            headers: refreshToken(this.headers),
        }).then(onResponse);
    }

    changingDataUser(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: refreshToken(this.headers),
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    changingAvatarUser(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: refreshToken(this.headers),
            body: JSON.stringify(data),
        }).then(onResponse);
    }
}

export const userApi = new UserApi(config);
