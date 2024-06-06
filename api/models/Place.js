// Create model(fields) for save the data into the database
const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    photos: [String],
    description: String,
    price: Number,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    meals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'
    }

});

module.exports = mongoose.model('Places', PlaceSchema);