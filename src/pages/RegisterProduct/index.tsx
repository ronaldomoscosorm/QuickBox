import { useRef } from 'react';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Label from '../../components/bootstrap/forms/Label';
import Input from '../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import Button from '../../components/bootstrap/Button';

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
	/**
	 * Formik
	 */
	const formik = useFormik({
		initialValues: {
			prdCode: '',
			prdName: '',
			prdDesciption: '',
			prdAmount: '',
			prdprice: '',
		},
		validate: (values) => {
			const errors: {
				prdCode?: string;
				prdName?: string;
				prdDesciption?: string;
				prdAmount?: string;
				prdprice?: string;
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
			if (!values.prdprice) {
				errors.prdprice = 'Campo obrigatório';
			}

			return errors;
		},
		onSubmit: async (values) => {
			console.log(values);
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
											htmlFor='prdName'
											className='text-mediumGrayRM-white'
											style={{ fontWeight: '600', fontSize: '1.3em' }}>
											Nome
										</Label>
										<Input
											id='prdName'
											size='lg'
											placeholder='Digite o nome do produto'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.prdName}
											isValid={formik.isValid}
											isTouched={formik.touched.prdName}
											invalidFeedback={formik.errors.prdName}
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
											htmlFor='prdprice'
											className='text-mediumGrayRM-white'
											style={{ fontWeight: '600', fontSize: '1.3em' }}>
											Preço
										</Label>
										<Input
											id='prdprice'
											size='lg'
											placeholder='Digite o preço do produto'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.prdprice}
											isValid={formik.isValid}
											isTouched={formik.touched.prdprice}
											invalidFeedback={formik.errors.prdprice}
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
