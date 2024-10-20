import axios, { AxiosInstance } from 'axios';
import { BSAnswerAllProducts, BSProductsInfo } from '../classes/BSAnswer';

let Api: AxiosInstance;

Api = axios.create({
	baseURL: 'https://api.rmtecho.com.br/api',
});

const getAllProducts = (field: string, filter: string) =>
	Api.get<BSAnswerAllProducts>('/QuickBox/GetProdutos/' + field + '/' + filter);

const saveProduct = (
	body: BSProductsInfo
) =>
	Api.post('/QuickBox/SaveProdutos/', JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json',
		},
	});


const endpoints = {
	getAllProducts,
	saveProduct,
};

export default endpoints;