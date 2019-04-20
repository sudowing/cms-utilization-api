import { GraphQLModule } from "@graphql-modules/core";
import gql from "graphql-tag";

import { resolvers } from "./npi-registry.resolvers";

const typeDefs = gql`
  type Query {
    getProvider: RegistryProfile
  }
  type RegistryProfileAddress {
    country_code: String!
    country_name: String!
    address_purpose: String!
    address_type: String!
    address_1: String
    address_2: String
    city: String!
    state: String!
    postal_code: String!
    telephone_number: String!
  }
  type RegistryProfileTaxonomy {
      code: String!
      desc: String!
      primary: Boolean!
      state: String!
      license: String!
  }
  type RegistryProfileIdentifier {
      identifier: String!
      code: String!
      desc: String!
      state: String!
      issuer: String!
  }
  type RegistryProfileOtherName {
      code: String!
      type: String!
      last_name: String!
      first_name: String!
      middle_name: String!
  }
  type RegistryProfileBasic {
      name_prefix: String!
      first_name: String!
      last_name: String!
      middle_name: String!
      credential: String!
      sole_proprietor: String!
      gender: String!
      enumeration_date: String!
      last_updated: String!
      status: String!
      name: String!
  }
  type RegistryProfile {
      enumeration_type: String!
      number: Float!
      last_updated_epoch: Float!
      created_epoch: Float!
      basic: RegistryProfileBasic!
      other_names: [RegistryProfileOtherName]
      addresses: [RegistryProfileAddress]
      taxonomies: [RegistryProfileTaxonomy]
      identifiers: [RegistryProfileIdentifier]
  }
`;

export const AppModule = new GraphQLModule({
  typeDefs,
  resolvers,
});
