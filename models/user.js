const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema();

userSchema.add({
  username: {
  	type: String
  },
  password: String,
  email: {
  	type:String,
  	unique: true
  },

  // Users who the current user is following
  followingUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Users who are following the current user
  followedByUsers: [{
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  }],
  searchQuery: {
  	type:String,
  	default: ''
  },
  searchHistory: [String]
});


module.exports = mongoose.model('User', userSchema);