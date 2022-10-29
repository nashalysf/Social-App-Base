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
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
      });

      var validateEmail= (email) =>{
        var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return re.test(email);
      }
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
            validate: [
              validateEmail, "Please enter an email"
            ]
        },

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