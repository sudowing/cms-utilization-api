import { QueryBuilder } from 'knex';
import { db } from '../../network-sources';

const parseOrderString = (orderString: string) => {
    const chunks = orderString.split(' ');
    const ordering: any = { column: chunks[0] };
    const directions = ['desc', 'asc'];
    if (chunks[1] && directions.includes(chunks[1])) {
        ordering.order = chunks[1];
    }
    return ordering;
};

const paginateAndOrderQuery = (query: QueryBuilder, pagination: any) => {
    const { limit, offset, order } = pagination;
    if (limit) {
        query.limit(limit);
    }
    if (offset) {
        query.offset(offset);
    }
    if (order) {
        const orderBy = order.map(parseOrderString);
        query.orderBy(orderBy);
    }
    return query;
};

export const providers = (npi: number | number[]) => {
    const npis = Array.isArray(npi) ? npi : [npi];
    return db.from('cms.providers as table').whereIn('table.npi', npis);
};

export const providers_individuals = (npi: number | number[]) => {
    const npis = Array.isArray(npi) ? npi : [npi];
    return db
        .from('cms.providers_individuals as table')
        .whereIn('table.npi', npis);
};

export const providers_organizations = (npi: number | number[]) => {
    const npis = Array.isArray(npi) ? npi : [npi];
    return db
        .from('cms.providers_organizations as table')
        .whereIn('table.npi', npis);
};
export const services = (hcpcs: string | string[]) => {
    const hcpcss = Array.isArray(hcpcs) ? hcpcs : [hcpcs];
    return db.from('cms.services as table').whereIn('table.hcpcs_code', hcpcss);
};
export const provider_performance = (where: object, pagination: object) => {
    const query = db.from('cms.provider_performance as table').where(where);
    return paginateAndOrderQuery(query, pagination);
};

export const count_provider_performance = (where: object) => {
    const query = db
        .from('cms.provider_performance as table')
        .where(where)
        .count();
    return query;
};

export const service_performance = (hcpcs: string | string[]) => {
    const hcpcss = Array.isArray(hcpcs) ? hcpcs : [hcpcs];
    return db
        .from('cms.service_performance as table')
        .whereIn('table.hcpcs_code', hcpcss);
};

export const service_provider_performance = (
    where: object,
    pagination: object,
) => {
    const query = db
        .from('cms.service_provider_performance as table')
        .where(where);
    return paginateAndOrderQuery(query, pagination);
};

export const count_service_provider_performance = (where: object) => {
    const query = db
        .from('cms.service_provider_performance as table')
        .where(where)
        .count();
    return query;
};

export const service_provider_performance_summary = (
    npi: number | number[],
) => {
    const npis = Array.isArray(npi) ? npi : [npi];
    return db
        .from('cms.service_provider_performance_summary as table')
        .whereIn('table.npi', npis);
};
export const service_provider_performance_summary_type = (id: number) => {
    const query = db.from(
        'cms.service_provider_performance_summary_type as table',
    );
    if (id) {
        query.where('table.id', id);
        // .limit(1);
    }
    return query;
};
