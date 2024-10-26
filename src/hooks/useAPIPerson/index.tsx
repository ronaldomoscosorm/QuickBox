import { AxiosError } from 'axios';
import { useCallback, useContext, useState } from 'react';
import endpoints from '../../services/endpoints';

const useAPIPerson = () => {
	/**
	 * Endpoints calls
	 */
	const getPersons = useCallback(
		async (field: string, filter: string, statusField: number): Promise<any> => {
			try {
				const { status, data } = await endpoints.getPersons(field, filter, statusField);

				console.log('Status chamada API (getPersons): ' + status.toString());
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
		getPersons,
	};
};

export default useAPIPerson;
