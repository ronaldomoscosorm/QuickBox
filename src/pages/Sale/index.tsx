import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import {
	BSAnswerAllProducts,
	BSAnswerPaymentMethods,
	BSAnswerPersonsInfo,
	BSAnswerString,
	BSPaymentMethodsInfo,
	BSProductsInfo,
	BSSaleDetailsInfo,
	BSSaleInfo,
} from '../../classes/BSAnswer';
import { BSPersonsInfo } from '../../classes/BSPersonsInfo';
import Avatar from '../../components/Avatar';
import Alert from '../../components/bootstrap/Alert';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import Button from '../../components/bootstrap/Button';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import InputGroup from '../../components/bootstrap/forms/InputGroup';
import Label from '../../components/bootstrap/forms/Label';
import Select from '../../components/bootstrap/forms/Select';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Spinner from '../../components/bootstrap/Spinner';
import Autocomplete from '../../components/custom/Autocomplete';
import ProductTable from '../../components/custom/ProductTable';
import useAPIPerson from '../../hooks/useAPIPerson';
import useAPIProducts from '../../hooks/useAPIProducts';
import useAPISale from '../../hooks/useAPISale';
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
	const { saveSale, getPaymentMethods } = useAPISale();
	const { getPersons, getPersonsPhoto } = useAPIPerson();
	const { findValueByField, reconstructBase64String } = functions();

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
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const [paymentMethods, setPaymentMethods] = useState<IList[]>([]);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
	const [isLoadingPersonSearch, setIsLoadingPersonSearch] = useState(false);
	const [person, setPerson] = useState<BSPersonsInfo>();
	const [allPersonsInputList, setAllPersonsInputList] = useState<IList[]>([]);
	const [personDocument, setPersonDocument] = useState<string>('');
	const [selectedPerson, setSelectedPerson] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [photo, setPhoto] = useState<string>('');

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

	const fetchPaymentMethods = async (field: string, filter: string | null) => {
		try {
			const requestData = await getPaymentMethods(field, filter);

			if (requestData instanceof AxiosError) {
				const error = requestData.response?.data.Message
					? requestData.response?.data.Message
					: requestData.message;
				console.log('Erro (fetchPaymentMethods): ', error);
			} else {
				if (requestData) {
					const res = requestData as BSAnswerPaymentMethods;

					if (res.Code === '0') {
						const resData = res.Data;

						if (resData) {
							// setAllProducts(resData);
							const methods = resData.map((item: BSPaymentMethodsInfo) => ({
								text: item.cmpDcFormaPagamento,
								value: item.cmpCoFormaPagamento.toString(),
							}));
							setPaymentMethods(methods);
						}
					} else {
						console.error('Error (fetchPaymentMethods): ', res.Message);
					}
				}
			}
		} catch (error) {
			console.error('Error (fetchPaymentMethods): ', error);
		}
	};

	const fetchPerson = async (field: string, filter: string, status: number) => {
		try {
			setIsLoadingPersonSearch(true);
			const requestData = await getPersons(field, filter, status);

			if (requestData instanceof AxiosError) {
				const error = requestData.response?.data.Message
					? requestData.response?.data.Message
					: requestData.message;
				console.log('Erro (fetchPerson): ', error);
			} else {
				if (requestData) {
					const res = requestData as BSAnswerPersonsInfo;

					if (res.Code === '0') {
						const resData = res.Data;

						if (resData) {
							setPerson(resData[0]);
							const allPersons = resData.map((item: BSPersonsInfo) => ({
								text: item.NAME,
								value: item.PERSID,
							}));
							setAllPersonsInputList(allPersons);
						}
					} else {
						console.error('Error (fetchPerson): ', res.Message);
					}
				}
			}
		} catch (error) {
			console.error('Error (fetchPerson): ', error);
		} finally {
			setIsLoadingPersonSearch(false);
		}
	};

	const fetchPersonPhoto = async (document: string) => {
		try {
			const requestData = await getPersonsPhoto(document);

			if (requestData instanceof AxiosError) {
				const error = requestData.response?.data.Message
					? requestData.response?.data.Message
					: requestData.message;
				console.log('Erro (fetchPersonPhoto): ', error);
			} else {
				if (requestData) {
					const res = requestData as BSAnswerString;

					if (res.Code === '0') {
						const resData = res.Data;

						if (resData) {
							const photoImage = reconstructBase64String(resData);
							setPhoto(photoImage);
						}
					} else {
						console.error('Error (fetchPersonPhoto): ', res.Message);
					}
				}
			}
		} catch (error) {
			console.error('Error (fetchPersonPhoto): ', error);
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

	useEffect(() => {
		if (modalStatus) {
			fetchPaymentMethods('geral', null);
		}
	}, [modalStatus]);

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
				setSelectedProduct(undefined);
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

	const handleConfirm = () => {
		try {
			const details: BSSaleDetailsInfo[] = allSales.map((item) => {
				return {
					cmpCoVendaDetalhe: 0,
					cmpCoVenda: 0,
					cmpVlVendaDesconto: 0,
					cmpCoProduto: item.cmpCoProduto,
					cmpDcVendaProduto: item.cmpDcProduto,
					cmpVlVendaPreco: item.cmpVlPreco,
					cmpVlVendaQuantidade: item.cmpVlQuantidade,
					cmpVlVendaSubtotal: item.cmpVlQuantidade * item.cmpVlPreco,
				};
			});
			const saleData: BSSaleInfo = {
				cmpCoVenda: 0,
				cmpCoFormaPagamento: parseInt(selectedPaymentMethod),
				cmpVlTotal: saleTotal,
				PERSID: selectedPerson,
				Detalhes: details,
			};
			saveSale(saleData).then((res) => {
				if (res) {
					const response = res as BSAnswerString;

					if (response.Code === '0') {
						setAlertData({
							alertColor: 'success',
							alertIcon: 'check-circle',
							alertMessage: 'Venda finalizada com sucesso',
							alertOpen: true,
						});
					} else {
						setAlertData({
							alertColor: 'danger',
							alertIcon: 'exclamation-triangle',
							alertMessage: 'Erro ao finalizar a venda',
							alertOpen: true,
						});
					}
				}
			});
		} catch (error) {
			console.error('Error (handleConfirm): ', error);
			setAlertData({
				alertColor: 'danger',
				alertIcon: 'exclamation-triangle',
				alertMessage: 'Erro ao finalizar a venda',
				alertOpen: true,
			});
		} finally {
			handleReset(true);
			setAllSales([]);
			setModalStatus(false);
			setSelectedPaymentMethod('');
			setSelectedPerson('');
			setPersonDocument('');
			setPhoto('');
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
			setModalStatus(false);

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
				<div className='col-12'>
					<Modal
						setIsOpen={setModalStatus}
						isOpen={modalStatus}
						titleId='finish-sale'
						isCentered
						isStaticBackdrop
						aria-modal='true'>
						<ModalHeader setIsOpen={setModalStatus}>
							<ModalTitle id='finish-sale' className='fs-3'>
								Finalizar Venda
							</ModalTitle>
						</ModalHeader>
						{/* Divider */}
						<div className='d-flex justify-content-center align-items-center'>
							<div className='col-12 border-bottom' />
						</div>
						<ModalBody>
							<div className='row'>
								<div className='col-lg-12 col-md-12'>
									<h4>Resumo da Venda</h4>
									<p className='fs-5'>
										Valor total:{' '}
										<strong>R$ {saleTotal.toFixed(2).replace('.', ',')}</strong>
									</p>
									<h4>Formas de Pagamento</h4>
									<FormGroup>
										{paymentMethods.map((method, index) => (
											<div className='mt-2' key={index}>
												<label className='fs-5'>
													<input
														type='radio'
														name='paymentMethod'
														value={method.value}
														checked={
															selectedPaymentMethod === method.value
														}
														onChange={() =>
															setSelectedPaymentMethod(method.value)
														}
													/>{' '}
													{method.text}
												</label>
											</div>
										))}
									</FormGroup>
									{selectedPaymentMethod === '4' && (
										<>
											<FormGroup className='col-lg-12 col-md-12 mt-3'>
												<Label
													htmlFor='searchDocOrNameOrAce'
													style={{ fontWeight: '700', fontSize: '12px' }}>
													Número do documento ou matrícula
												</Label>
												<InputGroup size='sm'>
													<Input
														id='searchDocOrNameOrAce'
														placeholder='Digite documento ou matrícula do colaborador'
														onChange={(
															e: React.ChangeEvent<HTMLSelectElement>,
														) => setPersonDocument(e.target.value)}
														value={personDocument}
														ariaDescribedby='button-addon'
													/>
													<Button
														color='femsaRed'
														id='button-addon'
														onClick={() =>
															fetchPerson('geral', personDocument, -1)
														}>
														Pesquisar
													</Button>
												</InputGroup>
											</FormGroup>

											<FormGroup
												className='col-lg-12 col-md-12 mt-3'
												size='sm'>
												<div className='d-flex'>
													<Label
														htmlFor='searchPerson'
														className='text-grayRM-white'
														style={{
															fontWeight: '700',
															fontSize: '12px',
														}}>
														Colaborador
													</Label>
													{/* <div className='ms-2'>
														{isLoadingPersonData && (
															<Spinner isSmall color='navyBlueRM' />
														)}
													</div> */}
												</div>
												<Select
													size='sm'
													ariaLabel='searchPerson'
													id='searchPerson'
													placeholder='Escolha o colaborador'
													list={allPersonsInputList}
													onChange={(
														event: React.ChangeEvent<HTMLSelectElement>,
													) => {
														const persid = event.target.value;

														if (persid) {
															setSelectedPerson(persid);
															if (person?.DOCUMENT) {
																fetchPersonPhoto(person.DOCUMENT);
															} else {
																setErrorMessage(
																	'Imagem não encontrada para este colaborador',
																);
															}
														}
													}}
													value={selectedPerson}
												/>
											</FormGroup>
											{errorMessage && (
												<p className='text-danger p-1'>{errorMessage}</p>
											)}
											{photo && (
												<div className='col-lg-auto text-center mt-2'>
													<Avatar
														className='object-fit-fill'
														src={photo}
														shadow='default'
														// color='FEMSAreD'
														rounded={1}
														size={120}
													/>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						</ModalBody>
						{/* Divider */}
						<div className='d-flex justify-content-center align-items-center'>
							<div className='col-12 border-bottom' />
						</div>
						<ModalFooter>
							<Button
								className='mx-2'
								color='light'
								onClick={() => setModalStatus(false)}>
								Cancelar
							</Button>
							<Button
								// type='submit'
								color='femsaRed'
								onClick={handleConfirm}
								isDisable={!selectedPaymentMethod}>
								Finalizar
							</Button>
						</ModalFooter>
					</Modal>
				</div>

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
									color='femsaRed'
									size='lg'
									onClick={handleAddProduct}
									isDisable={!selectedProduct}>
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
					<Card stretch>
						<CardBody className='d-flex justify-content-between align-items-center p-3'>
							<CardTitle style={{ fontWeight: '700', fontSize: '1.8em' }}>
								Total: R$ {saleTotal.toFixed(2).replace('.', ',')}
							</CardTitle>
							<Button
								color={'femsaRed'}
								size='lg'
								isDisable={allSales.length === 0}
								onClick={() => setModalStatus(true)}>
								Finalizar
							</Button>
						</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	);
}
