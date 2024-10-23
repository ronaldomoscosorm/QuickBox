import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import {
	BSAnswer,
	BSAnswerAllCategories,
	BSAnswerAllProducts,
	BSCategoriesInfo,
	BSProductsInfo,
} from '../../classes/BSAnswer';
import Alert from '../../components/bootstrap/Alert';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Button from '../../components/bootstrap/Button';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Label from '../../components/bootstrap/forms/Label';
import Spinner from '../../components/bootstrap/Spinner';
import Autocomplete from '../../components/custom/Autocomplete';
import useAPICategory from '../../hooks/useAPICategory';
import useAPIProducts from '../../hooks/useAPIProducts';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import { IAlertData } from '../../type/interfaces/IAlert';
import { IList } from '../../type/interfaces/IList';
import functions from '../../utils/functions';

export default function RegisterProduct() {
	/**
	 * Refs
	 */
	const alertRef = useRef<HTMLDivElement>(null);
	/**
	 * Configs
	 */
	// const pageConfig = config.stylesConfig[2];
	const registerText = 'Cadastro de produtos';
	const registerPath = '/cadastro-produtos';

	const { getAllProducts, saveProduct } = useAPIProducts();
	const { getAllCategories } = useAPICategory();
	const { findValueByField } = functions();

	const [alertData, setAlertData] = useState<IAlertData>({
		alertColor: undefined,
		alertIcon: '',
		alertMessage: '',
		alertOpen: false,
	});
	const [productsListInput, setProductsListInput] = useState<IList[]>([]);
	const [categoriesListInput, setCategoriesListInput] = useState<IList[]>([]);
	const [allProducts, setAllProducts] = useState<BSProductsInfo[]>([]);
	const [allCategories, setAllCategories] = useState<BSCategoriesInfo[]>([]);
	const [isLoadingAllProducts, setIsLoadingAllProducts] = useState<boolean>(false);
	const [isLoadingAllCategories, setIsLoadingAllCategories] = useState<boolean>(false);
	const [isLoadingSaveProduct, setIsLoadingSaveProduct] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<BSCategoriesInfo>();
	const [selectedProduct, setSelectedProduct] = useState<BSProductsInfo>();

	const fetchAlProducts = async (field: string, filter: string | null) => {
		try {
			setIsLoadingAllProducts(true);
			const requestData = await getAllProducts(field, filter);

			if (requestData instanceof AxiosError) {
				const error = requestData.response?.data.Message
					? requestData.response?.data.Message
					: requestData.message;
				console.log('Erro (fetchAlProducts): ', error);
			} else {
				if (requestData) {
					const res = requestData as BSAnswerAllProducts;

					if (res.Code === '0') {
						const resData = res.Data;

						if (resData) {
							setAllProducts(resData);
							const products = resData.map((item: BSProductsInfo) => ({
								text: item.cmpDcProduto,
								value: item.cmpCoProduto.toString(),
							}));
							setProductsListInput(products);
						}
					} else {
						console.error('Error (fetchAuthorizers): ', res.Message);
					}
				}
			}
		} catch (error) {
			console.error('Error (fetchAuthorizers): ', error);
		} finally {
			setIsLoadingAllProducts(false);
		}
	};

	const fetchAlCategories = async (field: string, filter: string | null) => {
		try {
			setIsLoadingAllCategories(true);
			const requestData = await getAllCategories(field, filter);

			if (requestData instanceof AxiosError) {
				const error = requestData.response?.data.Message
					? requestData.response?.data.Message
					: requestData.message;
				console.log('Erro (fetchAlCategories): ', error);
			} else {
				if (requestData) {
					const res = requestData as BSAnswerAllCategories;

					if (res.Code === '0') {
						const resData = res.Data;

						if (resData) {
							setAllCategories(resData);
							const categories = resData.map((item: BSCategoriesInfo) => ({
								text: item.cmpDcCategoria,
								value: item.cmpCoCategoria.toString(),
							}));
							setCategoriesListInput(categories);
						}
					} else {
						console.error('Error (fetchAuthorizers): ', res.Message);
					}
				}
			}
		} catch (error) {
			console.error('Error (fetchAuthorizers): ', error);
		} finally {
			setIsLoadingAllCategories(false);
		}
	};

	/**
	 * UseEffects
	 */
	useEffect(() => {
		if (alertData.alertOpen) {
			if (alertRef.current) {
				window.scrollTo(0, 0);
			}
		}
	}, [alertData.alertOpen]);

	useEffect(() => {
		fetchAlProducts('geral', null);
	}, []);

	useEffect(() => {
		fetchAlCategories('geral', null);
	}, []);

	/**
	 * Formik
	 */
	const handleReset = (submitButton: boolean) => {
		formik.resetForm();

		formik.setValues({
			prdName: '',
			prdCategory: '',
			prdAmount: '',
			prdPrice: '',
		});

		if (!submitButton) {
			setAlertData({
				alertColor: undefined,
				alertIcon: '',
				alertMessage: '',
				alertOpen: false,
			});
		}
	};
	const formik = useFormik({
		initialValues: {
			prdName: '',
			prdCategory: '',
			prdAmount: '',
			prdPrice: '',
		},
		validate: (values) => {
			const errors: {
				prdName?: string;
				prdCategory?: string;
				prdAmount?: string;
				prdPrice?: string;
			} = {};

			if (!values.prdName) {
				errors.prdName = 'Campo obrigatório';
			}
			if (!values.prdCategory) {
				errors.prdCategory = 'Campo obrigatório';
			}
			if (!values.prdAmount) {
				errors.prdAmount = 'Campo obrigatório';
			}
			if (!values.prdPrice) {
				errors.prdPrice = 'Campo obrigatório';
			}

			return errors;
		},
		onSubmit: async (values, { setSubmitting }) => {
			setAlertData({
				alertColor: undefined,
				alertIcon: '',
				alertMessage: '',
				alertOpen: false,
			});

			const product: BSProductsInfo = new BSProductsInfo();

			product.cmpCoProduto = selectedProduct?.cmpCoProduto || 0;
			product.cmpDcProduto = values.prdName;
			product.cmpVlQuantidade = parseInt(values.prdAmount);
			product.cmpVlPreco = parseFloat(values.prdPrice);
			product.cmpDcCategoria = selectedCategory?.cmpDcCategoria || values.prdCategory;
			product.cmpCoCategoria = selectedCategory?.cmpCoCategoria || 0;

			try {
				setIsLoadingSaveProduct(true);
				setSubmitting(true);

				console.log(product);

				// Cadastra o produto com a categoria
				const requestData: BSAnswer = await saveProduct(product);

				if (requestData?.Code === '0') {
					// Resets form right after data is saved
					handleReset(true);
					setAlertData({
						alertColor: 'success',
						alertIcon: 'CheckCircle',
						alertMessage: 'Produto salvo com sucesso!',
						alertOpen: true,
					});
				} else {
					setAlertData({
						alertColor: 'danger',
						alertIcon: 'Report',
						alertMessage:
							'Erro ao salvar produto! Por favor, tente novamente mais tarde!',
						alertOpen: true,
					});
					setSubmitting(false);
				}
			} catch (error) {
				setAlertData({
					alertColor: 'danger',
					alertIcon: 'Report',
					alertMessage: 'Erro ao salvar produto! Por favor, tente novamente mais tarde!',
					alertOpen: true,
				});
				console.error(error);
				setSubmitting(false);
			} finally {
				setIsLoadingSaveProduct(false);
				setSubmitting(false);
			}
		},
	});

	return (
		<PageWrapper title={'Cadastro de Produtos'} ref={alertRef}>
			<SubHeader className='mt-3'>
				<SubHeaderLeft>
					<Breadcrumb list={[{ title: registerText, to: registerPath }]} />
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				{alertData.alertOpen && (
					<Alert
						isDismissible
						isLight
						color={alertData.alertColor}
						icon={alertData.alertIcon}>
						{alertData.alertMessage}
					</Alert>
				)}
				<div className='row'>
					<div className='col-xl-12 col-lg-12 col-md-12'>
						<Card stretch tag='form' noValidate onSubmit={formik.handleSubmit}>
							<CardHeader className='text-black-white'>
								<CardLabel>
									<CardTitle style={{ fontWeight: '700', fontSize: '1.8em' }}>
										Cadastrar produto
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='pt-4 h-100'>
								<div className='row'>
									<FormGroup className='col-lg-12 col-md-12'>
										<div className='d-flex align-items-center'>
											<Label
												htmlFor='prdName'
												className='text-mediumGrayRM-white'
												style={{ fontWeight: '600', fontSize: '1.3em' }}>
												Nome
											</Label>
											<div className='ms-2'>
												{isLoadingAllProducts && (
													<Spinner isSmall color='femsaRed' />
												)}
											</div>
										</div>
										<Autocomplete
											id='prdName'
											aria-label='prdName'
											placeholder='Digite o nome do produto'
											size='lg'
											type='input'
											list={productsListInput}
											value={formik.values.prdName}
											minCharacters={4}
											noOptionsMessage='Produto não encontrado!'
											onChange={(e: string) => {
												const isOptionSelected = productsListInput.some(
													(product) => product.text === e,
												);

												// setSelectedProduct(e);
												if (e.length === 4) {
													fetchAlProducts('geral', e);
												}
												formik.setFieldValue('prdName', e);

												if (isOptionSelected) {
													const prdid = findValueByField(
														productsListInput,
														e,
														'value',
														'text',
													);

													const product = allProducts.find(
														(item) =>
															item.cmpCoProduto === parseInt(prdid),
													);
													setSelectedProduct(product);
													console.log(product);

													if (product) {
														formik.setFieldValue(
															'prdCode',
															product.cmpCoProduto.toString(),
														);
														formik.setFieldValue(
															'prdDesciption',
															product.cmpDcProduto,
														);
														formik.setFieldValue(
															'prdCategory',
															product.cmpDcCategoria,
														);
														formik.setFieldValue(
															'prdAmount',
															product.cmpVlQuantidade.toString(),
														);
														formik.setFieldValue(
															'prdPrice',
															product.cmpVlPreco.toString(),
														);
													}
												} else {
													// formik.setFieldValue('prdName', '');
													setSelectedProduct(undefined);
													formik.setFieldValue('prdCode', '');
													formik.setFieldValue('prdDesciption', '');
													formik.setFieldValue('prdCategory', '');
													formik.setFieldValue('prdAmount', '');
													formik.setFieldValue('prdPrice', '');
												}
											}}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.prdName}
											invalidFeedback={formik.errors.prdName}
										/>
									</FormGroup>
									<FormGroup className='col-lg-12 col-md-12 mt-3'>
										<div className='d-flex align-items-center'>
											<Label
												htmlFor='prdCategory'
												className='text-mediumGrayRM-white'
												style={{ fontWeight: '600', fontSize: '1.3em' }}>
												Categoria
											</Label>
											<div className='ms-2'>
												{isLoadingAllCategories && (
													<Spinner isSmall color='femsaRed' />
												)}
											</div>
										</div>
										<Autocomplete
											id='prdCategory'
											aria-label='prdCategory'
											placeholder='Digite o nome da categoria'
											size='lg'
											type='input'
											list={categoriesListInput}
											value={formik.values.prdCategory}
											minCharacters={4}
											noOptionsMessage='Categoria não encontrada!'
											onChange={(e: string) => {
												const isOptionSelected = categoriesListInput.some(
													(category) => category.text === e,
												);

												if (e.length === 4) {
													fetchAlCategories('geral', e);
												}
												formik.setFieldValue('prdCategory', e);

												if (isOptionSelected) {
													const prdid = findValueByField(
														categoriesListInput,
														e,
														'value',
														'text',
													);

													const category = allCategories.find(
														(item) =>
															item.cmpCoCategoria === parseInt(prdid),
													);
													setSelectedCategory(category);
												}
											}}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.prdCategory}
											invalidFeedback={formik.errors.prdCategory}
										/>
									</FormGroup>
									<FormGroup className='col-lg-12 col-md-12 mt-3'>
										<Label
											htmlFor='prdAmount'
											className='text-mediumGrayRM-white'
											style={{ fontWeight: '600', fontSize: '1.3em' }}>
											Quantidade
										</Label>
										<Input
											id='prdAmount'
											size='lg'
											placeholder='Digite a quantidade do produto'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.prdAmount}
											isValid={formik.isValid}
											isTouched={formik.touched.prdAmount}
											invalidFeedback={formik.errors.prdAmount}
										/>
									</FormGroup>
									<FormGroup className='col-lg-12 col-md-12 mt-3'>
										<Label
											htmlFor='prdPrice'
											className='text-mediumGrayRM-white'
											style={{ fontWeight: '600', fontSize: '1.3em' }}>
											Preço
										</Label>
										<Input
											id='prdPrice'
											size='lg'
											placeholder='Digite o preço do produto'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.prdPrice}
											isValid={formik.isValid}
											isTouched={formik.touched.prdPrice}
											invalidFeedback={formik.errors.prdPrice}
										/>
									</FormGroup>
								</div>

								<FormGroup className='mt-5 d-flex justify-content-end'>
									<Button
										type='submit'
										color='femsaRed'
										size='lg'
										isDisable={!formik.isValid && !!formik.isSubmitting}>
										{isLoadingSaveProduct && <Spinner isSmall inButton />}
										Cadastrar
									</Button>
								</FormGroup>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
}
