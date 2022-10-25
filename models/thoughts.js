const {Schema, model} =  require('mongoose');

const ThoughtsSchema = new Schema({
    thoughtText: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
    },
    reactions: []
  });

  // create the Pizza model using the PizzaSchema
const Thoughts = model('Thoughts', ThoughtsSchema);

// export the Pizza model
module.exports = Thoughts;