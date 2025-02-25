const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const mysql = require("mysql2/promise");

// Database configuration
const dbConfig = {
    host: "db",
    user: "user",
    password: "userpassword",
    database: "mydatabase",
};

// Define GraphQL schema
const schema = buildSchema(`
  type Category {
    id: ID
    name: String
    description: String
  }

  type Query {
    categories: [Category]
  }
`);

// Resolver functions
const root = {
  categories: async () => {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute("SELECT id, name, description FROM categories");
      await connection.end();
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to fetch categories");
    }
  },
};

// Export GraphQL middleware
module.exports = createHandler({
  schema,
  rootValue: root,
  graphiql: true, // Enables GraphiQL UI at /graphql
});
