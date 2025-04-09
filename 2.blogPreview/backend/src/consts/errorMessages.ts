export const errorMessages = {
    accessTokenMissed: 'Access token not provided',
    dbError: 'Error from DB server',
    dbConstraintErr: 'ER_CHECK_CONSTRAINT_VIOLATED',
    dbDataTooBig: 'ER_DATA_TOO_LONG',
    envMissed: 'Missing ACCESS_SECRET_KEY or REFRESH_SECRET_KEY in environment variables',
    invalidColor: 'Invalid color value',
    invalidToken: 'Invalid or expired token',
    networkError: 'A network error happened, try again',
    unknownError: 'An unknown Error occuered!',
    usernameNotInToken: 'Username not found in token',
    userMissed: 'User not found',
    websocketConnectionclosed: 'web socket connection closed',
    websocketInvalidToken: 'Your token has expired, please refresh via HTTP.',
    websocketMalformedMessage: 'malformed message from server recieved'
}