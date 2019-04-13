
import { db } from "../../network-sources";



export const provider_performance = (npi: number) => {
    return db.from("cms.provider_performance as table")
        .where("table.npi", npi);
}


export const providers = (npi: number) => {
    return db.from("cms.providers as table")
        .where("table.npi", npi);
}


export const providers_individuals = (npi: number) => {
    return db.from("cms.providers_individuals as table")
        .where("table.npi", npi);
}


export const providers_organizations = (npi: number) => {
    return db.from("cms.providers_organizations as table")
        .where("table.npi", npi);
}


export const service_performance = (hcpcs: string) => {
    return db.from("cms.service_performance as table")
        .where("table.hcpcs_code", hcpcs);
}


export const service_provider_performance = (where: object) => {
    const query = db.from("cms.service_provider_performance as table")
        .where(where).select();
    console.log('query', query.toString())
    return query
}


export const service_provider_performance_summary = (where: object) => {
    return db.from("cms.service_provider_performance_summary as table")
        .where(where);
}


export const service_provider_performance_summary_type = (where: object) => {
    return db.from("cms.service_provider_performance_summary_type as table")
        .where(where);
}


export const services = (hcpcs: string) => {
    return db.from("cms.services as table")
        .where("table.hcpcs_code", hcpcs);
}
