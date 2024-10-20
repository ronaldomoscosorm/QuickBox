import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { BSAnswer, BSAnswerAllProducts, BSProductsInfo } from '../../classes/BSAnswer';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Button from '../../components/bootstrap/Button';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Label from '../../components/bootstrap/forms/Label';
import Spinner from '../../components/bootstrap/Spinner';
import Autocomplete from '../../components/custom/Autocomplete';
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
	const { findValueByField } = functions();

	const [alertData, setAlertData] = useState<IAlertData>({
		alertColor: undefined,
		alertIcon: '',
		alertMessage: '',
		alertOpen: false,
	});
	const [productsListInput, setProductsListInput] = useState<IList[]>([]);
	const [allProducts, setAllProducts] = useState<BSProductsInfo[]>([]);
	const [isLoadingAllProducts, setIsLoadingAllProducts] = useState<boolean>(false);
	const [product, setProduct] = useState<BSProductsInfo>(new BSProductsInfo());
	const [selectedProduct, setSelectedProduct] = useState<string>('');

	const fetchAlProducts = async (field: string, filter: string | null) => {
		try {
			setIsLoadingAllProducts(true);
			const requestData = await getAllProducts(field, filter);

			if (requestData instanceof AxiosError) {
				const error = requestData.response?.data.Message
					? requestData.response?.data.Message
					: requestData.message;
				console.log('Erro (fetchAuthorizers): ', error);
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

	/**
	 * UseEffects
	 */
	useEffect(() => {
		fetchAlProducts('geral', null);
	}, []);

	/**
	 * Formik
	 */
	const handleReset = (submitButton: boolean) => {
		formik.resetForm();

		formik.setValues({
			prdCode: '',
			prdName: '',
			prdDesciption: '',
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
			prdCode: '',
			prdName: '',
			prdDesciption: '',
			prdAmount: '',
			prdPrice: '',
		},
		validate: (values) => {
			const errors: {
				prdCode?: string;
				prdName?: string;
				prdDesciption?: string;
				prdAmount?: string;
				prdPrice?: string;
			} = {};

			if (!values.prdCode) {
				errors.prdCode = 'Campo obrigatório';
			}
			if (!values.prdName) {
				errors.prdName = 'Campo obrigatório';
			}
			if (!values.prdDesciption) {
				errors.prdDesciption = 'Campo obrigatório';
			}
			if (!values.prdAmount) {
				errors.prdAmount = 'Campo obrigatório';
			}
			if (!values.prdPrice) {
				errors.prdPrice = 'Campo obrigatório';
			}

			return errors;
		},
		onSubmit: async (values) => {
			console.log(values);

			product.cmpCoProduto = parseInt(values.prdCode);
			product.cmpDcProduto = values.prdName;
			product.cmpVlQuantidade = parseInt(values.prdAmount);
			product.cmpVlPreco = parseFloat(values.prdPrice);

			try {
				const requestData = await saveProduct(product);

				if (requestData instanceof AxiosError) {
					const error = requestData.response?.data.Message
						? requestData.response?.data.Message
						: 'Erro ao salvar produto! Por favor, tente novamente mais tarde!';
					setAlertData({
						alertColor: 'danger',
						alertIcon: 'Report',
						alertMessage: error,
						alertOpen: true,
					});
				} else {
					if (requestData) {
						const res = requestData as BSAnswer;

						if (res?.Code === '0') {
							setAlertData({
								alertColor: 'success',
								alertIcon: 'CheckCircle',
								alertMessage: 'Produto salvo com sucesso!',
								alertOpen: true,
							});

							// Resets form right after data is saved
							handleReset(true);
						} else {
							setAlertData({
								alertColor: 'danger',
								alertIcon: 'Report',
								alertMessage: res.Message,
								alertOpen: true,
							});
						}
					} else {
						setAlertData({
							alertColor: 'danger',
							alertIcon: 'Report',
							alertMessage:
								'Erro ao salvar produto! Por favor, tente novamente mais tarde!',
							alertOpen: true,
						});
					}
				}
			} catch (error) {
				setAlertData({
					alertColor: 'danger',
					alertIcon: 'Report',
					alertMessage: 'Erro ao salvar produto! Por favor, tente novamente mais tarde!',
					alertOpen: true,
				});
				console.log(error);
			} finally {
				// setIsLoadingPage(false);
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
				<div className='row'>
					<div className='col-xl-12 col-lg-12 col-md-12'>
						<Card stretch tag='form' noValidate>
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
										<Autocomplete
											id='prdName'
											aria-label='prdName'
											placeholder='Digite o nome do produto'
											size='lg'
											type='input'
											list={productsListInput}
											value={selectedProduct}
											minCharacters={4}
											noOptionsMessage='Produto não encontrado!'
											onChange={(e: string) => {
												const isOptionSelected = productsListInput.some(
													(product) => product.text === e,
												);

												setSelectedProduct(e);
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
															'prdAmount',
															product.cmpVlQuantidade.toString(),
														);
														formik.setFieldValue(
															'prdPrice',
															product.cmpVlPreco.toString(),
														);
													}
												} else {
													formik.setFieldValue('prdName', '');
													formik.setFieldValue('prdCode', '');
												}
											}}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.prdName}
											invalidFeedback={formik.errors.prdName}
										/>
									</FormGroup>
									<FormGroup className='col-lg-12 col-md-12 mt-3'>
										<Label
											htmlFor='prdCode'
											className='text-mediumGrayRM-white'
											style={{ fontWeight: '600', fontSize: '1.3em' }}>
											Código
										</Label>
										<Input
											id='prdCode'
											size='lg'
											placeholder='Digite o código do produto'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.prdCode}
											isValid={formik.isValid}
											isTouched={formik.touched.prdCode}
											invalidFeedback={formik.errors.prdCode}
										/>
									</FormGroup>

									<FormGroup className='col-lg-12 col-md-12 mt-3'>
										<Label
											htmlFor='prdDesciption'
											className='text-mediumGrayRM-white'
											style={{ fontWeight: '600', fontSize: '1.3em' }}>
											Descrição
										</Label>
										<Input
											id='prdDesciption'
											size='lg'
											placeholder='Digite a descrição do produto'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.prdDesciption}
											isValid={formik.isValid}
											isTouched={formik.touched.prdDesciption}
											invalidFeedback={formik.errors.prdDesciption}
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

								<div className='mt-5 d-flex justify-content-end'>
									<Button
										type='submit'
										color='femsaRed'
										size='lg'
										isDisable={!formik.isValid && !!formik.submitCount}>
										Cadastrar
									</Button>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
}
