import { npiRegistry } from '../../network-sources';
import { RegistryProfile } from './npi-registry.interfaces';

export const getProvider = async (
    npi: number,
): Promise<RegistryProfile | null> => {
    const axiosResponse = await npiRegistry.get('', {
        params: {
            number: npi,
        },
    });
    const { status, data } = axiosResponse;
    const output =
        status === 200 && data.result_count === 1
            ? (data.results[0] as RegistryProfile)
            : null;
    return output;
};
