import { errorMessages } from "../consts/errorMessages.js";

function envValidator(): void {
    if (!process.env.ACCESS_SECRET_KEY || !process.env.REFRESH_SECRET_KEY) {
        throw new Error(errorMessages.envMissed);
    }
}

export default envValidator;