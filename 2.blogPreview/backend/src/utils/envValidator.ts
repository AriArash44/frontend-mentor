function envValidator(): void {
    if (!process.env.ACCESS_SECRET_KEY || !process.env.REFRESH_SECRET_KEY) {
        throw new Error('Missing ACCESS_SECRET_KEY or REFRESH_SECRET_KEY in environment variables');
    }
}

export default envValidator;