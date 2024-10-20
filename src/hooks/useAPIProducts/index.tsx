import { AxiosError } from "axios";
import { useCallback } from "react";
import { BSProductsInfo } from "../../classes/BSAnswer";
import endpoints from "../../services/endpoints";

const useAPIProducts  = () => {
    /**
	 * Endpoints calls
	 */
	const getAllProducts = useCallback(
		async (field: string, filter: string | null): Promise<any> => {
			try {
                const { status, data } = await endpoints.getAllProducts(
                    field,
                    filter,
                );

                console.log('Status chamada API (getAllProducts): ' + status.toString());
                return data;
				
			} catch (error) {
				const err = error as AxiosError;
				console.log(err);
				return error;
			}
		},
		[],
	);

    const saveProduct = useCallback(async (body: BSProductsInfo) => {
		try {
            const { status, data } = await endpoints.saveProduct(body);

            console.log('Status chamada API (saveProduct): ' + status.toString());
            return data;
			
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
			return error;
		}
	}, []);

    return {
		getAllProducts,
        saveProduct,
	};
}

export default useAPIProducts