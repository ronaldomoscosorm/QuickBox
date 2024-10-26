import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { BSSaleInfo } from '../../classes/BSAnswer';
import endpoints from '../../services/endpoints';

const useAPISale = () => {
	/**
	 * Endpoints calls
	 */
    const getPaymentMethods = useCallback(
		async (field: string, filter: string | null): Promise<any> => {
			try {
                const { status, data } = await endpoints.getPaymentMethods(
                    field,
                    filter,
                );

                console.log('Status chamada API (getPaymentMethods): ' + status.toString());
                return data;
				
			} catch (error) {
				const err = error as AxiosError;
				console.log(err);
				return error;
			}
		},
		[],
	);

	const saveSale = useCallback(async (body: BSSaleInfo) => {
		try {
			const { status, data } = await endpoints.saveSale(body);

			console.log('Status chamada API (saveSale): ' + status.toString());
			return data;
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
			return error;
		}
	}, []);

	return {
        getPaymentMethods,
		saveSale,
	};
};

export default useAPISale;
