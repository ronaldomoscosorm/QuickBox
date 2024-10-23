import { AxiosError } from 'axios';
import { useCallback } from 'react';
import endpoints from '../../services/endpoints';

const useAPICategory = () => {
	/**
	 * Endpoints calls
	 */
	const getAllCategories = useCallback(
		async (field: string, filter: string | null): Promise<any> => {
			try {
				const { status, data } = await endpoints.getAllCategories(field, filter);

				console.log('Status chamada API (getAllCategories): ' + status.toString());
				return data;
			} catch (error) {
				const err = error as AxiosError;
				console.log(err);
				return error;
			}
		},
		[],
	);

	return {
		getAllCategories,
	};
};

export default useAPICategory;