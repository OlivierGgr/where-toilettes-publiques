import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
    type: String,
    statut: Boolean,
    adresse: String,
    arrondissement: String,
    horaire: String,
    acces_pmr: String,
    relais_bebe: { type: String, default: null },
    url_fiche_equipement: { type: String, default: null },
    location: {
        type: Object,
        geometry: {
            type: String,
            coordinates: { type: [Number, Number], required: true },
        },
    },
    // geo_shape: {
    //   type: Object,
    //   geometry: {
    //     coordinates: { type: [[Number, Number]], required: true },
    //     type: "MultiPoint",
    //   },
    //   properties: {},
    // },
});

ToiletSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Toilet", ToiletSchema);
