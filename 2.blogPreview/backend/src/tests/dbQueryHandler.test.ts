jest.mock('../db.ts', () => ({
    query: jest.fn(),
}));

import db from "../db.js";
import { getUserPreferences, setUserPreferences } from "../utils/dbQueryHandler.js";
import { errorMessages } from "../consts/errorMessages.js";

beforeEach(() => {
    jest.resetAllMocks();
});

describe('get user preferences tests', () => {
    it('should resolve with the color if the query returns a result', async () => {
        (db.query as jest.Mock).mockImplementation((_query, _params, callback) => {
            callback(null, [{ color: 'blue' }]);
        });
        const result = await getUserPreferences('testUser');
        expect(result).toBe('blue');
        expect(db.query).toHaveBeenCalledWith(
            'SELECT color FROM preferences WHERE username = ?',
            ['testUser'],
            expect.any(Function)
        );
    });

    it('should resolve with null if no results are found', async () => {
        (db.query as jest.Mock).mockImplementation((_query, _params, callback) => {
            callback(null, []);
        });
        const result = await getUserPreferences('nonExistentUser');
        expect(result).toBeNull();
        expect(db.query).toHaveBeenCalledWith(
            'SELECT color FROM preferences WHERE username = ?',
            ['nonExistentUser'],
            expect.any(Function)
        );
    });

    it('should reject with a database error if the query fails', async () => {
        (db.query as jest.Mock).mockImplementation((_query, _params, callback) => {
            callback(new Error('Database error'), null);
        });
        await expect(getUserPreferences('testUser')).rejects.toThrow(errorMessages.dbError);
        expect(db.query).toHaveBeenCalledWith(
            'SELECT color FROM preferences WHERE username = ?',
            ['testUser'],
            expect.any(Function)
        );
    });
});

describe('set user preferences tests', () => {
    it('should resolve when preferences are successfully set', async () => {
        (db.query as jest.Mock).mockImplementation((_query, _params, callback) => {
            callback();
        });
        await expect(setUserPreferences('testUser', 'blue')).resolves.toBeUndefined();
        expect(db.query).toHaveBeenCalledWith(
            'REPLACE INTO preferences (username, color) VALUES (?, ?)',
            ['testUser', 'blue'],
            expect.any(Function)
        );
    });

    it('should reject with invalidColor error for constraint or data-too-big error', async () => {
        (db.query as jest.Mock).mockImplementation((_query, _params, callback) => {
            callback({ code: errorMessages.dbConstraintErr });
        });
        await expect(setUserPreferences('testUser', 'invalidColor')).rejects.toEqual(
            Object.assign(new Error(errorMessages.invalidColor), { status: 400 })
        );
        (db.query as jest.Mock).mockImplementation((_query, _params, callback) => {
            callback({ code: errorMessages.dbDataTooBig });
        });
        await expect(setUserPreferences('testUser', 'invalidColor')).rejects.toEqual(
            Object.assign(new Error(errorMessages.invalidColor), { status: 400 })
        );
    });

    it('should reject with dbError for other database errors', async () => {
        (db.query as jest.Mock).mockImplementation((_query, _params, callback) => {
            callback({ code: 'SomeOtherError' });
        });
        await expect(setUserPreferences('testUser', 'blue')).rejects.toEqual(
            Object.assign(new Error(errorMessages.dbError), { status: 500 })
        );
    });
});