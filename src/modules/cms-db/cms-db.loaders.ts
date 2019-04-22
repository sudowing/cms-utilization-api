import * as DataLoader from "dataloader";
import * as svc from "./cms-db.services";

const providers = new DataLoader(keys => svc.provider(keys));
const providerIndividuals = new DataLoader(keys => svc.providerIndividual(keys));
const providerOrganizations = new DataLoader(keys => svc.providerOrganization(keys));
const services = new DataLoader(keys => svc.service(keys));
const servicePerformances = new DataLoader(keys => svc.servicePerformance(keys));
const serviceProviderPerformanceSummaries = new DataLoader(keys => svc.serviceProviderPerformanceSummary(keys));

// need to ensure the results are in the correct order ^^

export const loaders = {
    providers,
    providerIndividuals,
    providerOrganizations,
    services,
    servicePerformances,
    serviceProviderPerformanceSummaries,
};
