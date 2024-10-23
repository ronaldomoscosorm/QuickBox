import axios, { AxiosInstance } from 'axios';
import { BSAnswerAllCategories, BSAnswerAllProducts, BSProductsInfo } from '../classes/BSAnswer';

let Api: AxiosInstance;

Api = axios.create({
	baseURL: 'https://api.rmtecho.com.br/api',
});

const getAllProducts = (field: string, filter: string | null) =>
	Api.get<BSAnswerAllProducts>('/QuickBox/GetProdutos/' + field + '/' + filter);

const getAllCategories = (field: string, filter: string | null) =>
	Api.get<BSAnswerAllCategories>('/QuickBox/GetCategorias/' + field + '/' + filter);

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
	getAllCategories,
};

export default endpoints;