import { genPaginationOrder } from "../../utils";
import * as ts from "./cms-db.interfaces";
import * as svc from "./cms-db.services";

export const resolvers = {
    Query: {
        async provider(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.Provider[]> {
            const { npis } = args.input;
            return await svc.provider(npis);
        },
        async providerIndividual(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ProviderIndividual[]> {
            const { npis } = args.input;
            return await svc.providerIndividual(npis);
        },
        async providerOrganization(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ProviderOrganization[]> {
            const { npis } = args.input;
            return await svc.providerOrganization(npis);
        },
        async countProviderPerformances(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<any> {
            const { npi, hcpcs_code } = args.input;
            const results = await svc.countProviderPerformances({
                npi,
                hcpcs_code,
            });
            return { ...results[0] };
        },
        async providerPerformances(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ProviderPerformance[]> {
            const { npi, hcpcs_code } = args.input;
            const pagination = genPaginationOrder(args.pagination);
            return await svc.providerPerformances(
                { npi, hcpcs_code },
                pagination,
            );
        },
        async countServiceProviderPerformance(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<any> {
            const { npi, hcpcs_code } = args.input;
            const results = await svc.countServiceProviderPerformance({
                npi,
                hcpcs_code,
            });
            return { ...results[0] };
        },
        async serviceProviderPerformance(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ServiceProviderPerformance[]> {
            const { npi, hcpcs_code } = args.input;
            const pagination = genPaginationOrder(args.pagination);
            return await svc.serviceProviderPerformance(
                { npi, hcpcs_code },
                pagination,
            );
        },
        async service(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.Service[]> {
            const { hcpcs_codes } = args.input;
            return await svc.service(hcpcs_codes);
        },
        async servicePerformance(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ServicePerformance[]> {
            const { hcpcs_codes } = args.input;
            return await svc.servicePerformance(hcpcs_codes);
        },
        async serviceProviderPerformanceSummary(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ServiceProviderPerformanceSummary[]> {
            const { npis } = args.input;
            return await svc.serviceProviderPerformanceSummary(npis);
        },
        async serviceProviderPerformanceSummaryType(
            obj: any,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ServiceProviderPerformanceSummaryType[]> {
            const { id } = args;
            return await svc.serviceProviderPerformanceSummaryType(id);
        },
    },

    Provider: {
        async detail(
            obj: ts.Provider,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ProviderIndividual | ts.ProviderOrganization> {
            const { npi, entity_type } = obj;
            const getDetails =
                entity_type === "I"
                    ? svc.providerIndividual
                    : svc.providerOrganization;
            const details = await getDetails([npi]);
            return details[0];
        },
        async performanceSummaries(
            obj: ts.Provider,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ServiceProviderPerformanceSummary[]> {
            const { npi } = obj;
            return await svc.serviceProviderPerformanceSummary([npi]);
        },
        async countProviderPerformance(
            obj: ts.Provider,
            args: any,
            context: any,
            info: any,
        ): Promise<any> {
            const { npi } = obj;
            const results = await svc.countProviderPerformances({ npi });
            return { ...results[0] };
        },
        async providerPerformance(
            obj: ts.Provider,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ProviderPerformance[]> {
            const { npi } = obj;
            const pagination = genPaginationOrder(args.pagination);
            return await svc.providerPerformances({ npi }, pagination);
        },
        async countServiceProviderPerformance(
            obj: ts.Provider,
            args: any,
            context: any,
            info: any,
        ): Promise<any> {
            const { npi } = obj;
            const results = await svc.countServiceProviderPerformance({ npi });
            return { ...results[0] };
        },
        async serviceProviderPerformances(
            obj: ts.Provider,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ServiceProviderPerformance[]> {
            const { npi } = obj;
            const pagination = genPaginationOrder(args.pagination);
            return await svc.serviceProviderPerformance({ npi }, pagination);
        },
    },
    ProviderPerformance: {
        async service(
            obj: ts.ProviderPerformance,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.Service> {
            const { hcpcs_code } = obj;
            const records = await svc.service([hcpcs_code]);
            return records[0] as ts.Service;
        },
        async provider(
            obj: ts.ProviderPerformance,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.Provider> {
            const { npi } = obj;
            const records = await svc.provider([npi]);
            return records[0] as ts.Provider;
        },
    },
    Service: {
        async servicePerformance(
            obj: ts.Service,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ServicePerformance[]> {
            const { hcpcs_code } = obj;
            return await svc.servicePerformance([hcpcs_code]);
        },
        async countProviderPerformance(
            obj: ts.Service,
            args: any,
            context: any,
            info: any,
        ): Promise<any> {
            const { hcpcs_code } = obj;
            const results = await svc.countProviderPerformances({ hcpcs_code });
            return { ...results[0] };
        },
        async providerPerformance(
            obj: ts.Service,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ProviderPerformance[]> {
            const { hcpcs_code } = obj;
            const pagination = genPaginationOrder(args.pagination);
            return await svc.providerPerformances({ hcpcs_code }, pagination);
        },
        async countServiceProviderPerformance(
            obj: ts.Service,
            args: any,
            context: any,
            info: any,
        ): Promise<any> {
            const { hcpcs_code } = obj;
            const results = await svc.countServiceProviderPerformance({
                hcpcs_code,
            });
            return { ...results[0] };
        },
        async serviceProviderPerformances(
            obj: ts.Service,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.ServiceProviderPerformance[]> {
            const { hcpcs_code } = obj;
            const pagination = genPaginationOrder(args.pagination);
            return await svc.serviceProviderPerformance(
                { hcpcs_code },
                pagination,
            );
        },
    },
    ServiceProviderPerformance: {
        async provider(
            obj: ts.ServiceProviderPerformance,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.Provider> {
            const { npi } = obj;
            const records = await svc.provider([npi]);
            return records[0];
        },
        async service(
            obj: ts.ServiceProviderPerformance,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.Service> {
            const { hcpcs_code } = obj;
            const records = await svc.service([hcpcs_code]);
            return records[0];
        },
    },
    ServiceProviderPerformanceSummary: {
        async provider(
            obj: ts.ServiceProviderPerformanceSummary,
            args: any,
            context: any,
            info: any,
        ): Promise<ts.Provider> {
            const { npi } = obj;
            const records = await svc.provider([npi]);
            return records[0];
        },
    },
};
