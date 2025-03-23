export type ApiError = {
    response?: {
        status: number;
        data: {
            message: string;
        };
    };
};