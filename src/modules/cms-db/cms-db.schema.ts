import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';

import { apiModule, searchModule } from '../index';
import { resolvers } from './cms-db.resolvers';

const typeDefs = gql`
    type Query {
        provider(input: ProviderTermsInput!): [Provider]
        providerIndividual(input: ProviderTermsInput!): [ProviderIndividual]
        providerOrganization(input: ProviderTermsInput!): [ProviderOrganization]
        providerPerformances(
            input: ServiceProviderTermsInput!
            pagination: PaginationInput
        ): [ProviderPerformance!]
        service(input: ServiceTermsInput!): [Service]
        servicePerformance(input: ServiceTermsInput!): [ServicePerformance!]
        serviceProviderPerformance(
            input: ServiceProviderTermsInput!
            pagination: PaginationInput
        ): [ServiceProviderPerformance!]
        serviceProviderPerformanceSummary(
            input: ProviderTermsInput!
        ): [ServiceProviderPerformanceSummary!]
        serviceProviderPerformanceSummaryType(
            id: String
        ): [ServiceProviderPerformanceSummaryType!]
        countProviderPerformances(input: ServiceProviderTermsInput!): PageCount
        countServiceProviderPerformance(
            input: ServiceProviderTermsInput!
        ): PageCount
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
        detail: ProviderDetail!
        performanceSummaries: [ServiceProviderPerformanceSummary!]!
        countProviderPerformance: PageCount!
        providerPerformance(
            pagination: PaginationInput
        ): [ProviderPerformance!]!
        countServiceProviderPerformance: PageCount
        serviceProviderPerformances(
            pagination: PaginationInput
        ): [ServiceProviderPerformance!]!
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

    type ProviderDetail {
        npi: Float!
        name_last: String
        name_first: String
        name_middle: String
        credentials: String
        gender: String
        name: String
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
        service: Service
        provider: Provider
    }

    type Service {
        hcpcs_code: String!
        hcpcs_description: String!
        hcpcs_drug_indicator: String!
        servicePerformance: [ServicePerformance!]!
        countProviderPerformance: PageCount!
        providerPerformance(
            pagination: PaginationInput
        ): [ProviderPerformance!]!
        countServiceProviderPerformance: PageCount
        serviceProviderPerformances(
            pagination: PaginationInput
        ): [ServiceProviderPerformance!]!
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
        provider: Provider
        service: Service
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
        provider: Provider
    }

    type ServiceProviderPerformanceSummaryType {
        id: Float!
        slug: String!
        description: String!
        group_membership: Boolean!
    }

    input ServiceProviderTermsInput {
        hcpcs_code: String
        npi: Float
    }

    input ProviderTermsInput {
        npis: [Float!]!
    }

    input ServiceTermsInput {
        hcpcs_codes: [String!]!
    }

    input PaginationInput {
        page: Float
        limit: Float
        order: [String!]
    }

    type PageCount {
        count: Float!
    }
`;

export const AppModule: GraphQLModule = new GraphQLModule({
    typeDefs,
    resolvers,
    // imports: [apiModule, searchModule],
});
