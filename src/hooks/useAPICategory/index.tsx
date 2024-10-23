import { AxiosError } from 'axios';
import { useCallback } from 'react';
import endpoints from '../../services/endpoints';
import { BSCategoriesInfo } from '../../classes/BSAnswer';

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

	const savecategory = useCallback(async (body: BSCategoriesInfo) => {
		try {
			const { status, data } = await endpoints.saveCategory(body);

			console.log('Status chamada API (savecategory): ' + status.toString());
			return data;
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
			return error;
		}
	}, []);

	return {
		getAllCategories,
        savecategory,
	};
};

export default useAPICategory;
