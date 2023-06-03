export const showError = (error) => {
    return alert(error);
};

export const isLoadingData = (data) => {
    return data.type.endsWith('pending');
};
export const forErrors = (data) => {
    return data.type.endsWith('rejected');
};
