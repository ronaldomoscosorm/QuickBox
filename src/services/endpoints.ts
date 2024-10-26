import axios, { AxiosInstance } from 'axios';
import {
	BSAnswerAllCategories,
	BSAnswerAllProducts,
	BSAnswerPaymentMethods,
	BSCategoriesInfo,
	BSProductsInfo,
	BSSaleInfo,
} from '../classes/BSAnswer';

let Api: AxiosInstance;

Api = axios.create({
	baseURL: 'https://api.rmtecho.com.br/api',
});

const getAllProducts = (field: string, filter: string | null) =>
	Api.get<BSAnswerAllProducts>('/QuickBox/GetProdutos/' + field + '/' + filter);

const getAllCategories = (field: string, filter: string | null) =>
	Api.get<BSAnswerAllCategories>('/QuickBox/GetCategorias/' + field + '/' + filter);

const saveProduct = (body: BSProductsInfo) =>
	Api.post('/QuickBox/SaveProdutos/', JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json',
		},
	});

const saveCategory = (body: BSCategoriesInfo) =>
	Api.post('/QuickBox/SaveCategorias/', JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json',
		},
	});

const saveSale = (body: BSSaleInfo) =>
	Api.post('/QuickBox/SaveVenda/', JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json',
		},
	});

const getPaymentMethods = (field: string, filter: string | null) =>
	Api.get<BSAnswerPaymentMethods>('/QuickBox/GetFormasPagamento/' + field + '/' + filter);

const endpoints = {
	getAllProducts,
	saveProduct,
	getAllCategories,
	saveCategory,
	saveSale,
	getPaymentMethods,
};

export default endpoints;
