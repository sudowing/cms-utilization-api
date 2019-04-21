import { GraphQLModule } from "@graphql-modules/core";
import gql from "graphql-tag";

import { apiModule, searchModule } from "../index";
import { resolvers } from "./cms-db.resolvers";

const typeDefs = gql`
  type Query {
    provider: Provider
    providerIndividual: ProviderIndividual
    providerOrganization: ProviderOrganization
    providerPerformances: [ProviderPerformance!]
    service: Service
    servicePerformance: [ServicePerformance!]
    serviceProviderPerformance: [ServiceProviderPerformance!]
    serviceProviderPerformanceSummary: [ServiceProviderPerformanceSummary!]
    serviceProviderPerformanceSummaryType: [ServiceProviderPerformanceSummaryType!]
  }

  type Provider {
    npi: Float!
    entity_type: String!
    provider_type: String!
    address_street_01: String!
    address_street_02: String
    address_city: String!
    address_zip_code: String!
    address_state: String!
    address_country: String!
    address_latitude: String!
    address_longitude: String!
  }

  type ProviderIndividual {
      npi: Float!
      name_last: String!
      name_first: String!
      name_middle: String
      credentials: String!
      gender: String!
  }

  type ProviderOrganization {
      npi: Float!
      name: String!
  }

  type ProviderPerformance {
      npi: Float!
      mcare_participation_indicator: String!
      place_of_service: String!
      hcpcs_code: String!
      n_of_svcs: Float!
      n_of_mcare_beneficiaries: Float!
      n_of_distinct_mcare_beneficiary_per_day_svcs: Float!
      avg_mcare_allowed_amt: Float!
      avg_submitted_charge_amt: Float!
      avg_mcare_pay_amt: Float!
      avg_mcare_standardized_amt: Float!
      prisma_id: Float!
  }

  type Service {
      hcpcs_code: String!
      hcpcs_description: String!
      hcpcs_drug_indicator: String!
  }

  type ServicePerformance {
      hcpcs_code: String!
      entity_type: String!
      providers: Float!
      n_of_svcs: Float!
      n_of_distinct_mcare_beneficiary_per_day_svcs: Float!
      n_of_mcare_beneficiaries: Float!
      avg_avg_mcare_pay_amt: Float!
      avg_avg_submitted_charge_amt: Float!
      avg_avg_mcare_allowed_amt: Float!
      avg_avg_mcare_standardized_amt: Float!
      min_avg_mcare_pay_amt: Float!
      max_avg_mcare_pay_amt: Float!
      var_avg_mcare_pay_amt: Float!
      min_avg_mcare_allowed_amt: Float!
      max_avg_mcare_allowed_amt: Float!
      var_avg_mcare_allowed_amt: Float!
      min_avg_submitted_charge_amt: Float!
      max_avg_submitted_charge_amt: Float!
      var_avg_submitted_charge_amt: Float!
      min_avg_mcare_standardized_amt: Float!
      max_avg_mcare_standardized_amt: Float!
      var_avg_mcare_standardized_amt: Float!
      est_ttl_mcare_pay_amt: Float!
      est_ttl_submitted_charge_amt: Float!
      est_ttl_mcare_allowed_amt: Float!
      est_ttl_mcare_standardized_amt: Float!
      rank_providers: Float!
      rank_n_of_svcs: Float!
      rank_n_of_distinct_mcare_beneficiary_per_day_svcs: Float!
      rank_n_of_mcare_beneficiaries: Float!
      rank_avg_avg_mcare_pay_amt: Float!
      rank_avg_avg_submitted_charge_amt: Float!
      rank_avg_avg_mcare_allowed_amt: Float!
      rank_avg_avg_mcare_standardized_amt: Float!
      rank_min_avg_mcare_pay_amt: Float!
      rank_max_avg_mcare_pay_amt: Float!
      rank_var_avg_mcare_pay_amt: Float!
      rank_min_avg_mcare_allowed_amt: Float!
      rank_max_avg_mcare_allowed_amt: Float!
      rank_var_avg_mcare_allowed_amt: Float!
      rank_min_avg_submitted_charge_amt: Float!
      rank_max_avg_submitted_charge_amt: Float!
      rank_var_avg_submitted_charge_amt: Float!
      rank_min_avg_mcare_standardized_amt: Float!
      rank_max_avg_mcare_standardized_amt: Float!
      rank_var_avg_mcare_standardized_amt: Float!
      rank_est_ttl_mcare_pay_amt: Float!
      rank_est_ttl_submitted_charge_amt: Float!
      rank_est_ttl_mcare_allowed_amt: Float!
      rank_est_ttl_mcare_standardized_amt: Float!
      var_avg_mcare_submitted_charge_pay_amt: Float!
      rank_var_avg_mcare_submitted_charge_pay_amt: Float!
      prisma_id: Float!
  }

  type ServiceProviderPerformance {
      hcpcs_code: String!
      npi: Float!
      entity_type: String!
      n_of_svcs: Float!
      n_of_distinct_mcare_beneficiary_per_day_svcs: Float!
      n_of_mcare_beneficiaries: Float!
      avg_mcare_pay_amt: Float!
      avg_submitted_charge_amt: Float!
      avg_mcare_allowed_amt: Float!
      avg_mcare_standardized_amt: Float!
      est_ttl_mcare_pay_amt: Float!
      est_ttl_submitted_charge_amt: Float!
      rank_n_of_svcs: Float!
      rank_n_of_distinct_mcare_beneficiary_per_day_svcs: Float!
      rank_n_of_mcare_beneficiaries: Float!
      rank_avg_mcare_standardized_amt: Float!
      rank_avg_mcare_allowed_amt: Float!
      rank_avg_submitted_charge_amt: Float!
      rank_avg_mcare_pay_amt: Float!
      rank_est_ttl_mcare_pay_amt: Float!
      rank_est_ttl_submitted_charge_amt: Float!
      mcare_participation_indicator: String!
      place_of_service: String!
      var_avg_mcare_submitted_charge_pay_amt: Float!
      rank_var_avg_mcare_submitted_charge_pay_amt: Float!
      prisma_id: Float!
  }


  type ServiceProviderPerformanceSummary {
      npi: Float!
      entity_type: String!
      ttl_hcpcs_code: Float!
      ttl_n_of_svcs: Float!
      est_ttl_submitted_charge_amt: Float!
      est_ttl_mcare_pay_amt: Float!
      var_est_ttl_mcare_submitted_charge_pay_amt: Float!
      est_ttl_mcare_pay_amt_by_ttl_hcpcs_code: Float!
      est_ttl_mcare_pay_amt_by_ttl_n_of_svcs: Float!
      rank_ttl_hcpcs_code: Float!
      rank_ttl_n_of_svcs: Float!
      rank_est_ttl_submitted_charge_amt: Float!
      rank_est_ttl_mcare_pay_amt: Float!
      rank_var_est_ttl_mcare_submitted_charge_pay_amoun: Float!
      rank_est_ttl_mcare_pay_amt_by_ttl_hcpcs_code: Float!
      rank_est_ttl_mcare_pay_amt_by_ttl_n_of_servi: Float!
      summary_type: Float!
      prisma_id: Float!
  }


  type ServiceProviderPerformanceSummaryType {
      id: Float!
      slug: String!
      description: String!
      group_membership: Boolean!
  }

  input ServiceProviderTerms {
      npi: Float
      hcpcs_code: String
  }

`;

export const AppModule: GraphQLModule = new GraphQLModule({
  typeDefs,
  resolvers,
  // imports: [apiModule, searchModule],
});