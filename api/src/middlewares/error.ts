import { Request, Response } from "express";

const handleErrors = (err: any, _: Request, res: Response, next: any) => {
    res.status(500).json({
        message: err.message,
        success: false,
    });
};

export { handleErrors };