const {Schema, model, Types} =  require('mongoose');

const FriendsSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
        username:{
            type: String,
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

const UserSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        username:{
                    type: String,
                    require: 'You need to provide a username name.',
                    unique: true,
                    trim: true
                },
      userEmail:{
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            require: true,
        },
        
        Thoughts:[ThoughtsSchema],

        friends: [FriendsSchema],
},
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
  });

  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  // create the model using the Schema
const User = model('User', UserSchema);

// export the  model
module.exports = User;