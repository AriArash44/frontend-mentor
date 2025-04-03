import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
};

export const accessCookieOptions: CookieOptions = {
    ...cookieOptions,
    maxAge: 60 * 60 * 1000,
};

export const refreshCookieOptions: CookieOptions = {
    ...cookieOptions,
    maxAge: 24 * 60 * 60 * 1000,
};

export const clearCookieOptions: CookieOptions = {
    ...cookieOptions,
    maxAge: 0,
};
