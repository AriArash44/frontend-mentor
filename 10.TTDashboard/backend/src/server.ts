import data from "./consts/data.json";
import express from "express";
import cors from 'cors';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { errorMessages } from "./consts/errorMessages";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/time-data', async (req: Request, res: Response): Promise<any> => {
    function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    try {
        const { timeSlot } = (req.query);
        const timeSlotValue = timeSlot?.toString();
        if (!timeSlotValue) {
            return res.status(400).json({ error: errorMessages.missingTimeSlot });
        }
        if (!['daily', 'weekly', 'monthly'].includes(timeSlotValue)) {
            return res.status(400).json({ error: errorMessages.badTimeSlot });
        }
        const finalData = data.map((activity) => {
            return {
                title: activity.title,
                current: Math.max(0, activity.timeframes[timeSlotValue as keyof typeof activity.timeframes]["current"] + getRandomInt(-3, 3)),
                previous: activity.timeframes[timeSlotValue as keyof typeof activity.timeframes]["previous"]
            }
        });
        res.json(finalData);
    } catch (error) {
        res.status(500).json({ error: errorMessages.unknownError });
    }
});

const IMAGE_FOLDER = path.join(__dirname, 'assets/images');
app.get('/api/user-image', async (req: Request, res: Response): Promise<any> => {
    try {
        const { username } = (req.query);
        const usernameValue = username?.toString();
        if (!usernameValue) {
            return res.status(400).json({ error: errorMessages.missingUsername });
        }
        const fullPath = path.join(IMAGE_FOLDER, usernameValue.concat(".png"));
        console.log(fullPath);
        fs.access(fullPath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send(errorMessages.imageNotFound);
            }
            return res.sendFile(fullPath);
        });
    } catch (error) {
        res.status(500).json({ error: errorMessages.unknownError });
    }
});

export default app;