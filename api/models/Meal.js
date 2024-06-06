const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
  mealType: [String],
  mealPrice: [Number]
})

const Meal = mongoose.model('Meal', mealSchema)

module.exports = Meal
