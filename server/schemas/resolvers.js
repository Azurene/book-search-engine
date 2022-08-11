const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not logged in.');
    },

    // getSingleUser: async (parent, {user = null, args }) => {
    //   const foundUser = await User.findOne({
    //     $or: [{ _id: user ? user._id : args.id }, { username: args.username }],
    //   })
    //     .select('-__v -password');

    //   if (!foundUser) {
    //     return AuthenticationError('Cannot find a user with this id!')
    //   }

    //   return foundUser;
    // }
  },
  
  Mutation: {
    login: async (parent, { body }) => {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

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

    addUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        return new AuthenticationError("Something is wrong!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // saveBook: async (parent, args) => {
    //   console.log(args);
    //   return;
    //   // try {
    //   //   const updatedUser = await User.findOneAndUpdate(
    //   //     { _id: user._id },
    //   //     { $addToSet: { savedBooks: body } },
    //   //     { new: true, runValidators: true }
    //   //   );
    //   //   return updatedUser;
    //   // } catch (err) {
    //   //   console.log(err);
    //   //   return new AuthenticationError("Something went wrong!");
    //   // }
    // },
    // removeBook: async (parent, args) => {
    //   console.log(args);
    //   return;
    // },
  }
}

module.exports = resolvers;