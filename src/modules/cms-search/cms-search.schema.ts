import { GraphQLModule } from "@graphql-modules/core";
import gql from "graphql-tag";

import { apiModule, dbModule } from "../index";
import { resolvers } from "./cms-search.resolvers";

const typeDefs = gql`
  type Query {
    searchGeoProviders(
      geo: GeoOptions!
      service: ServiceOptions
      limit: Int
      entity_type: String
    ): [ProviderPerformanceRecord!]
    searchGeoServiceStats(
      geo: GeoOptions!
      service: ServiceOptions
      limit: Int
      entity_type: String
    ): [ServiceStats!]
    autocompleteServices(
      search: String!,
      limit: Int
    ): [ServiceSuggestion!]
    suggestProviders(
      search: String!,
      limit: Int
    ): [ProviderSuggestion!]
  }

  input GeoOptions {
    location: GeoLocationInput
    distanceUnit: String
    distanceValue: Float
    top_left: GeoLocationInput
    bottom_right: GeoLocationInput
  }

  input ServiceOptions {
      hcpcsCodes: [String]
      allServices: Boolean
  }

  input GeoLocationInput {
      lat: Float!
      lon: Float!
  }

  type ServiceSuggestion {
      hcpcs_code: String!
      hcpcs_description: String!
  }

  type ProviderSuggestion {
      npi: Float!
      entity_type: String!
      address_city: String!
      address_state: String!
      gender: String!
      name_first: String!
      name_last: String!
  }

  type ProviderPerformanceDetail {
      npi: Float!
      hcpcs_code: String!
      n_of_svcs: Float!
      n_of_distinct_mcare_beneficiary_per_day_svcs: Float!
      n_of_mcare_beneficiaries: Float!
      avg_mcare_pay_amt: Float!
      avg_submitted_charge_amt: Float!
      avg_mcare_allowed_amt: Float!
      avg_mcare_standardized_amt: Float!
      est_ttl_mcare_pay_amt: Float!
      est_ttl_submitted_charge_amt: Float!
      mcare_participation_indicator: Boolean!
      place_of_service: String!
      var_avg_mcare_submitted_charge_pay_amt: Float!
  }

  type ProviderPerformanceLocation {
      lat: String!
      lon: String!
  }

  type ProviderPerformanceRecord {
      npi: Float!
      entity_type: String!
      location: ProviderPerformanceLocation!
      performances: [ProviderPerformanceDetail]
  }


  type ServiceStats {
      hcpcs_code: String!
      provider_count: Float!
      n_of_svcs: Float!
      avg_submitted_charge_amt: Float!
      avg_mcare_pay_amt: Float!
      avg_mcare_allowed_amt: Float!
      avg_mcare_standardized_amt: Float!
      est_ttl_submitted_charge_amt: Float!
      est_ttl_mcare_pay_amt: Float!
      est_ttl_mcare_allowed_amt: Float!
      est_ttl_mcare_standardized_amt: Float!

  }

`;

export const AppModule: GraphQLModule = new GraphQLModule({
  typeDefs,
  resolvers,
  // imports: [dbModule, apiModule],
});
