let isLoggedIn = false;

export const setLoginFlag = (value: boolean) => {
    isLoggedIn = value;
};

export const getLoginFlag = () => isLoggedIn;