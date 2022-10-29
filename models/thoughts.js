const {Schema, model, Types} =  require('mongoose');
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody:{
            type: String,
            require: true,
            trim: true,
            max: 280
        },
        writtenBy: {
            type: String,
            require: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
      });
    

const ThoughtsSchema = new Schema({
    thoughtText: {
      type: String,
      require: true,
      min: 1,
      max: 280
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      require: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
  });
  
  ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  // create the model using the Schema
const Thoughts = model('Thoughts', ThoughtsSchema);

// export the  model
module.exports = Thoughts;