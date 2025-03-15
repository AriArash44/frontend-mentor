interface CustomError extends Error {
    code?: string;
}

export default CustomError;