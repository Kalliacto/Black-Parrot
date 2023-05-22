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

export const productRating = (reviews) => {
    if (!reviews || !reviews.length) {
        return 0;
    }
    const res = reviews.reduce((acc, el) => (acc += el.rating), 0);
    return Math.round(res / reviews.length);
};

export const timeOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
};

export const passwordValidationCheck = {
    required: {
        value: true,
        message: 'Пароль должен быть обязательно!',
    },
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message:
            'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру',
    },
};

export const telephoneValidationCheck = {
    required: {
        value: true,
    },
    pattern: {
        value: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
        message:
            'Телефон должен начинаться только с цифры или знака +, состоять из цифр, в середине можно использовать скобоки, пробел и знак дефиса ',
    },
};

export const checkingTheFillingEmail = { required: 'Email обязательно!' };

export const checkingTheFillingGroup = { required: 'Введите вашу группу обязательно!' };
