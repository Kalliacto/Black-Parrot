export const showError = (error) => {
    return alert(error);
};

export const isLoadingData = (data) => {
    if (data.type.includes('Like') || data.type.includes('Review')) {
        return false;
    }
    return data.type.endsWith('pending');
};
export const forErrors = (data) => {
    return data.type.endsWith('rejected');
};
