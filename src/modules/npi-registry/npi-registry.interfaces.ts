interface RegistryProfileAddress {
    country_code: string;
    country_name: string;
    address_purpose: string;
    address_type: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postal_code: string;
    telephone_number: string;
}
interface RegistryProfileTaxonomy {
    code: string;
    desc: string;
    primary: boolean;
    state: string;
    license: string;
}
interface RegistryProfileIdentifier {
    identifier: string;
    code: string;
    desc: string;
    state: string;
    issuer: string;
}

interface RegistryProfileOtherName {
    code: string;
    type: string;
    last_name: string;
    first_name: string;
    middle_name: string;
}

interface RegistryProfileBasic {
    name_prefix: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    credential: string;
    sole_proprietor: string;
    gender: string;
    enumeration_date: string;
    last_updated: string;
    status: string;
    name: string;
}

export interface RegistryProfile {
    enumeration_type: string;
    number: number;
    last_updated_epoch: number;
    created_epoch: number;
    basic: RegistryProfileBasic;
    other_names: RegistryProfileOtherName[];
    addresses: RegistryProfileAddress[];
    taxonomies: RegistryProfileTaxonomy[];
    identifiers: RegistryProfileIdentifier[];
}
