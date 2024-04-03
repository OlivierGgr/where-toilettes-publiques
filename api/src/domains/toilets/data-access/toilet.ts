import { Request, Response } from "express";
import { formatToiletData } from "../helpers/helpers";
import { COMMON_ERROR, CREATED_CODE, SUCCESS_CODE } from "../../core/utils";
import data from "../../../data.json";

const Toilet = require("../models/Toilets");

export const insertToilets = async (_: Request, res: Response) => {
    try {
        const cleanData = data.map((d: any) => {
            const coordinates = d.geo_shape.geometry.coordinates.flat();
            if (coordinates == null) throw { message: d };
            delete d.geo_shape;

            return {
                ...d,
                location: {
                    coordinates,
                    type: "Point",
                },
            };
        });

        Toilet.insertMany(cleanData);
        res.status(SUCCESS_CODE).json({ ok: "ok" });
    } catch (error: any) {
        res.status(COMMON_ERROR).json({ message: error.message });
    }
};

export const createToilet = async (req: Request, res: Response) => {
    try {
        const toilet = await Toilet.create(req.body);
        res.status(CREATED_CODE).json({ toilet });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getToilets = async (req: Request, res: Response) => {
    try {
        const toilets = await Toilet.find({}).limit(req.body?.limit ?? 20);
        res.status(CREATED_CODE).json({ toilets });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getNearbyToilets = async (req: Request, res: Response) => {
    try {
        const coordinates = req.query.coordinates ?? [2.398240888534442, 48.85145734053414];
        const maxDistance = req.query.maxDistance ?? 300;

        const toilets = await Toilet.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates,
                    },
                    $maxDistance: +maxDistance,
                },
            },
        });

        res.status(CREATED_CODE).json({
            toilets: formatToiletData(
                toilets,
                req.query.favorites as string,
                req.query.isFavorites as string | undefined,
                req.query.isOpen as string | undefined
            ),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { insertToilets, createToilet, getToilets, getNearbyToilets };
