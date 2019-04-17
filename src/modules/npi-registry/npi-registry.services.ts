import { npiRegistry } from "../../network-sources";

export const getProvider = async (npi: number) => {
    const axiosResponse = await npiRegistry.get("", {
        params: {
            number: npi,
        },
    });
    const { status, data } = axiosResponse;
    const output = (status === 200 && data.result_count === 1) ? data.results[0] : null;
    return output;
}