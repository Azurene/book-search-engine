const { gql } = require('apollo-server-express');
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
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
  }

  type Book {
    bookId: Int
    authors: String
    description: String
    title: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`

module.exports = typeDefs;