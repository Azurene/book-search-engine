const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // me: which returns a User type
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not logged in.');
    }
  },
  Mutation: {
    // login
    // accepts email and password
    // returns Auth type
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can't find this user.");
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    // addUser
    // accepts username, email, and password as parameters
    // returns Auth type
    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        return new AuthenticationError("Something is wrong!");
      }

      const token = signToken(user);
      return { token, user };
    }
    // saveBook
    // accepts a book author's array, description, title, bookId, image, and link
    // returns User type
    // look into creating an input type to handle these parameters
    
    // removeBook
    // accepts a book's bookId as a parameter
    // returns a User type
    // User
    // _id
    // username
    // email
    // bookCount
    // savedBooks (array of Book type)
    // Book
    // bookId (not _id, but the book's id from Google's Book api)
    // authors: array of strings
    // description
    // title
    // image
    // link
    // Auth
    // token
    // user (references User type)
  }
}

module.exports = resolvers;