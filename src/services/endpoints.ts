import axios, { AxiosInstance } from 'axios';
import {
	BSAnswerAllCategories,
	BSAnswerAllProducts,
	BSAnswerPaymentMethods,
	BSAnswerPersonsInfo,
	BSAnswerString,
	BSCategoriesInfo,
	BSProductsInfo,
	BSSaleInfo,
} from '../classes/BSAnswer';

let Api: AxiosInstance;

const ratio: number = 1;

Api = axios.create({
	baseURL: 'http://localhost:10112/api',
	//baseURL: 'http://api.rmtecho.com.br/api',
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

/**
 * Persons
 */
const getPersons = (field: string, filter: string, status: number) =>
	Api.get<BSAnswerPersonsInfo>('/Persons/Get/' + field + '/' + filter + '/' + status, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

const getPersonsPhoto = (document: string) =>
	Api.get<BSAnswerString>('/Persons/GetPhoto/' + document + '/' + ratio, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

const endpoints = {
	getAllProducts,
	saveProduct,
	getAllCategories,
	saveCategory,
	saveSale,
	getPaymentMethods,
	getPersons,
	getPersonsPhoto,
};

export default endpoints;
