import { Request, Response } from "express";

export const getAllAvatars = async (req: Request, res: Response) => {
    try {

    } catch(error: any) {
        res.status(500).send({ message: error.message })
    }
}