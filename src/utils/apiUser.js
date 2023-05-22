const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'Content-Type': 'application/json',
        authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmYjgyNDMyOTFkNzkwYjNmM2IzMDkiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgxODk4MjMxLCJleHAiOjE3MTM0MzQyMzF9.Pjg_bXUQkZt9RyGlYZbt_6PXaFLP0Nt11LGaMQG1lQg',
    },
};

const onResponse = (data) => {
    return data.ok ? data.json() : Promise.reject(`Что-то пошло не так`);
};

class UserApi {
    constructor(data) {
        this.baseUrl = data.baseUrl;
        this.headers = data.headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    signIn(data) {
        return fetch(`${this.baseUrl}/signin`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    signUp(data) {
        return fetch(`${this.baseUrl}/signup`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data),
        }).then(onResponse);
    }
    resetPass(data) {
        return fetch(`${this.baseUrl}/forgot-password`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data),
        }).then(onResponse);
    }
    resetPassWithToken(token, data) {
        return fetch(`${this.baseUrl}/password-reset/${token}`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        }).then(onResponse);
    }

    getUserInfoById(id) {
        return fetch(`${this.baseUrl}/users/${id}`, {
            method: 'GET',
            headers: this.headers,
        }).then(onResponse);
    }

    changingDataUser(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(onResponse);
    }
}

export const userApi = new UserApi(config);
