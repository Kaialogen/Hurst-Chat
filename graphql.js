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
  type Topic {
    topic_id: ID
    topic_subject: String
  }

  type Category {
    id: ID
    name: String
    description: String
    topics: [Topic]
  }

  type Query {
    categories: [Category]
    topics: [Topic]
  }
`);

// Resolver functions
const root = {
  categories: async () => {
    try {
      const connection = await mysql.createConnection(dbConfig);

      // Get categories
      const [categories] = await connection.execute("SELECT id, name, description FROM categories");

      // Get topics
      const [topics] = await connection.execute("SELECT topic_id, topic_subject, topic_cat FROM topics");

      // Map topics to categories
      const categoriesWithTopics = categories.map((category) => {
        const relatedTopics = topics.filter((topic) => topic.topic_cat === category.id);
        return {
          ...category,
          topics: relatedTopics,
        };
      });

      await connection.end();
      return categoriesWithTopics;

    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to fetch categories with topics");
    }
  },
};

// Export GraphQL middleware
module.exports = createHandler({
  schema,
  rootValue: root,
  graphiql: true, // Enables GraphiQL UI at /graphql
});
