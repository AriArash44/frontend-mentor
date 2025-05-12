import data from "./data.json";
import express from "express";
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/time-data', async (req: Request, res: Response): Promise<any> => {
    try {
        const { timeSlot } = (req.query);
        const timeSlotValue = timeSlot?.toString();
        if (!timeSlotValue) {
            return res.status(400).json({ error: "Missing 'timeSlot' query parameter" });
        }
        if (!['daily', 'weekly', 'monthly'].includes(timeSlotValue)) {
            return res.status(400).json({ error: "'timeSlot' must be daily, weekly, or monthly" });
        }
        const finalData = data.map((activity) => {
            return {
                title: activity.title,
                timeframes: {
                    timeSlotValue: activity.timeframes[timeSlotValue as keyof typeof activity.timeframes]
                }
            }
        });
        res.json(finalData);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default app;