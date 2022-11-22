import { buildSchema } from 'graphql';

export const productSchema = buildSchema(`
                                         type Product {
                                           id: ID!
                                           name: String!,
                                           description: String!,
                                           productCode: Int,
                                           imageId: String!,
                                           imageUrl: String!,
                                           hasFreeShipping: Boolean!,
                                           discount: Int!,
                                           discountedPrice: Int!,
                                           promotion: [String!],
                                           categories: [String!],
                                           region: [String!],
                                           rating: Int,
                                           payment: [String!],
                                           price: Int!,
                                           stock: Int!,
                                         }

                                         input ProductInput {
                                           name: String,
                                           description: String,
                                           image: String,
                                           hasFreeShipping: Boolean,
                                           discount: Int,
                                           price: Int,
                                           stock: Int
                                         }

                                         type Query {
                                           list: [Product!]!
                                           readById(id: ID!): Product
                                         }

                                         type Mutation {
                                           create(data: ProductInput): Product
                                           patchById(id: ID!, data: ProductInput): Product
                                           deleteById(id: ID!): String
                                         }
                                         `);
