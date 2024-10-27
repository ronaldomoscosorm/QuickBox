import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';
import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
import { IAlertData } from '../../../type/interfaces/IAlert';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Bem-vindo,</div>
			<div className='text-center h4 text-muted mb-5'>Faça login para continuar!</div>
		</>
	);
};
LoginHeader.defaultProps = {
	isNewUser: false,
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const [alertData, setAlertData] = useState<IAlertData>({
		alertColor: undefined,
		alertIcon: '',
		alertMessage: '',
		alertOpen: false,
	});

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	const usernameCheck = (username: string) => {
		return !!getUserDataWithUsername(username);
	};

	const passwordCheck = (username: string, password: string) => {
		return getUserDataWithUsername(username).password === password;
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: USERS.JOHN.username,
			loginPassword: USERS.JOHN.password,
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			if (usernameCheck(values.loginUsername)) {
				if (passwordCheck(values.loginUsername, values.loginPassword)) {
					if (setUser) {
						setUser(values.loginUsername);
					}

					handleOnClick();
				} else {
					formik.setFieldError('loginPassword', 'Username and password do not match.');
				}
			}
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			if (
				!Object.keys(USERS).find(
					(f) => USERS[f].username.toString() === formik.values.loginUsername,
				)
			) {
				formik.setFieldError('loginUsername', 'No such user found in the system.');
			} else {
				setSignInPassword(true);
			}
			setIsLoading(false);
		}, 1000);
	};

	return (
		<PageWrapper isProtected={false} title={'Login'} className={classNames('bg-light')}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='d-flex justify-content-center'>
									<Logo width={'auto'} />
								</div>

								<LoginHeader />

								{alertData.alertOpen && (
									<Alert
										isLight
										color={alertData.alertColor}
										icon={alertData.alertIcon}>
										{alertData.alertMessage}
									</Alert>
								)}

								<form className='row g-4'>
									<FormGroup
										id='loginUsername'
										className='col-lg-12 col-md-12'
										label='Nome de usuário'>
										<Input
											autoComplete='username'
											className='bg-lightGrayFacit border-transparent text-grayRM'
											value={formik.values.loginUsername}
											isTouched={formik.touched.loginUsername}
											invalidFeedback={formik.errors.loginUsername}
											isValid={formik.isValid}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											onFocus={() => {
												formik.setErrors({});
												setAlertData({
													alertColor: undefined,
													alertIcon: '',
													alertMessage: '',
													alertOpen: false,
												});
											}}
										/>
									</FormGroup>

									<FormGroup
										id='loginPassword'
										className='col-lg-12 col-md-12'
										label='Senha'>
										<Input
											type='password'
											autoComplete='current-password'
											className='bg-lightGrayFacit border-transparent text-grayRM'
											value={formik.values.loginPassword}
											isTouched={formik.touched.loginPassword}
											invalidFeedback={formik.errors.loginPassword}
											isValid={formik.isValid}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</FormGroup>

									<div className='col-12'>
										<Button
											color='warning'
											className='w-100 py-3'
											onClick={formik.handleSubmit}
											isDisable={isLoading}>
											{isLoading && <Spinner isSmall inButton isGrow />}
											Login
										</Button>
									</div>
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
