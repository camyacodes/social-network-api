const { Schema, Types, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true

    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    thoughts: [thoughtSchema],

    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);


userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
   return this.friends?.length || 0;
  })

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
