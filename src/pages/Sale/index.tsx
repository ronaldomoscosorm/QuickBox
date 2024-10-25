import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { BSAnswerAllProducts, BSProductsInfo } from '../../classes/BSAnswer';
import Alert from '../../components/bootstrap/Alert';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Button from '../../components/bootstrap/Button';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Label from '../../components/bootstrap/forms/Label';
import Spinner from '../../components/bootstrap/Spinner';
import Autocomplete from '../../components/custom/Autocomplete';
import ProductTable from '../../components/custom/ProductTable';
import useAPIProducts from '../../hooks/useAPIProducts';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import { IAlertData } from '../../type/interfaces/IAlert';
import { IList } from '../../type/interfaces/IList';
import functions from '../../utils/functions';

export default function Sale() {
	/**
	 * Refs
	 */
	const alertRef = useRef<HTMLDivElement>(null);
	/**
	 * Configs
	 */
	// const pageConfig = config.stylesConfig[2];
	const registerText = 'Venda';
	const registerPath = '/venda';

	const { getAllProducts } = useAPIProducts();
	const { findValueByField } = functions();

	const [alertData, setAlertData] = useState<IAlertData>({
		alertColor: undefined,
		alertIcon: '',
		alertMessage: '',
		alertOpen: false,
	});
	const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(false);
	const [allProducts, setAllProducts] = useState<BSProductsInfo[]>([]);
	const [productsListInput, setProductsListInput] = useState<IList[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<BSProductsInfo>();
	const [allSales, setAllSales] = useState<BSProductsInfo[]>([]);
	const [saleTotal, setSaleTotal] = useState<number>(0);
	const [isEditing, setIsEditing] = useState(false);

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
		if (allSales.length > 0) {
			console.log(allSales);
			const total = allSales.reduce((acc, item) => {
				const totalItem = item.cmpVlQuantidade * item.cmpVlPreco;
				return acc + totalItem;
			}, 0);

			setSaleTotal(total);
		} else {
			setSaleTotal(0);
		}
	}, [allSales]);

	const handleAddProduct = () => {
		if (isEditing) {
			// Lógica para atualizar o produto existente
			const updatedSales = allSales.map((p) =>
				p.cmpCoProduto === selectedProduct?.cmpCoProduto
					? {
							...p,
							cmpVlQuantidade: formik.values.prdAmount,
							cmpVlPreco: parseFloat(formik.values.prdPrice),
						}
					: p,
			);
			setAllSales(updatedSales);
			setIsEditing(false);
			handleReset(true);
		} else {
			// Lógica para adicionar um novo produto
			if (selectedProduct) {
				const newProduct = {
					...selectedProduct,
					cmpVlQuantidade: formik.values.prdAmount,
					cmpVlPreco: parseFloat(formik.values.prdPrice),
				};
				setAllSales([...allSales, newProduct]);
				handleReset(true);
			}
		}
	};

	const handleEditProduct = (product: BSProductsInfo) => {
		// Preencha os valores do formulário com os dados do produto
		formik.setValues({
			prdName: product.cmpDcProduto,
			prdAmount: product.cmpVlQuantidade,
			prdPrice: product.cmpVlPreco.toString(),
		});
		setSelectedProduct(product);
		setIsEditing(true);
	};

	const handleReset = (submitButton: boolean) => {
		formik.resetForm();

		formik.setValues({
			prdName: '',
			prdAmount: 1,
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

	/**
	 * Formik
	 */
	const formik = useFormik({
		initialValues: {
			prdName: '',
			prdAmount: 1,
			prdPrice: '',
		},
		validate: (values) => {
			const errors: {
				prdName?: string;
				prdAmount?: string;
				prdPrice?: string;
			} = {};

			if (!values.prdName) {
				errors.prdName = 'Campo obrigatório';
			}
			if (!values.prdAmount) {
				errors.prdAmount = 'Campo obrigatório';
			}
			if (!values.prdPrice) {
				errors.prdPrice = 'Campo obrigatório';
			}

			return errors;
		},
		onSubmit: (values, { setSubmitting }) => {
			setAlertData({
				alertColor: undefined,
				alertIcon: '',
				alertMessage: '',
				alertOpen: false,
			});
			setSubmitting(true);

			console.log(values);
		},
	});
	return (
		<PageWrapper title={'Venda'} ref={alertRef}>
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
				<div className='col-xl-12 col-lg-12 col-md-12'>
					<Card stretch>
						<CardHeader className='text-black-white'>
							<CardLabel>
								<CardTitle style={{ fontWeight: '700', fontSize: '1.8em' }}>
									Adicionar produto
								</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody className='pt-2 pb-2 h-100'>
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
													(item) => item.cmpCoProduto === parseInt(prdid),
												);
												setSelectedProduct(product);

												if (product) {
													formik.setFieldValue('prdAmount', 1);
													formik.setFieldValue(
														'prdPrice',
														product.cmpVlPreco.toString(),
													);
												}
											} else {
												// formik.setFieldValue('prdName', '');
												setSelectedProduct(undefined);
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
								<FormGroup className='col-lg-6 col-md-6 mt-2'>
									<Label
										htmlFor='prdAmount'
										className='text-mediumGrayRM-white'
										style={{ fontWeight: '600', fontSize: '1.3em' }}>
										Quantidade
									</Label>
									<Input
										id='prdAmount'
										size='lg'
										type='number'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.prdAmount}
										isValid={formik.isValid}
										isTouched={formik.touched.prdAmount}
										invalidFeedback={formik.errors.prdAmount}
									/>
								</FormGroup>
								<FormGroup className='col-lg-6 col-md-6 mt-2'>
									<Label
										htmlFor='prdPrice'
										className='text-mediumGrayRM-white'
										style={{ fontWeight: '600', fontSize: '1.3em' }}>
										Preço
									</Label>
									<Input
										id='prdPrice'
										size='lg'
										placeholder='R$'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.prdPrice}
										isValid={formik.isValid}
										isTouched={formik.touched.prdPrice}
										invalidFeedback={formik.errors.prdPrice}
									/>
								</FormGroup>
							</div>
							<FormGroup className='mt-2 d-flex justify-content-end'>
								<Button
									type='submit'
									color='femsaRed'
									size='lg'
									onClick={handleAddProduct}>
									{isEditing ? 'Salvar' : 'Adicionar'}
								</Button>
							</FormGroup>
						</CardBody>
					</Card>
				</div>

				<div className='col-xl-12 col-lg-12 col-md-12'>
					<Card stretch>
						<CardHeader className='text-black-white'>
							<CardLabel>
								<CardTitle style={{ fontWeight: '700', fontSize: '1.8em' }}>
									Visualizar produtos
								</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody
							className='pt-0 pb-3'
							style={{ maxHeight: '20em', minHeight: '20em', overflow: 'auto' }}>
							<ProductTable
								data={allSales}
								setData={setAllSales}
								onEdit={handleEditProduct}
								isLoading={false}
							/>
						</CardBody>
					</Card>
				</div>

				<div className='col-xl-12 col-lg-12 col-md-12'>
					<Card stretch tag='form' noValidate onSubmit={formik.handleSubmit}>
						<CardBody className='d-flex justify-content-between align-items-center p-3'>
							<CardTitle style={{ fontWeight: '700', fontSize: '1.8em' }}>
								Total: R$ {saleTotal.toFixed(2).replace('.', ',')}
							</CardTitle>
							<Button
								type='submit'
								color={'femsaRed'}
								size='lg'
								onClick={() => handleReset(false)}>
								Finalizar
							</Button>
						</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	);
}
