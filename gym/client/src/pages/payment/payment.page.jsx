import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import { toast } from 'react-toastify';

const PaymentPage = () => {
	const [paymentMethod, setPaymentMethod] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		cardholderName: '',
		fullName: '',
		cardNumber: '',
		emailAddress: '',
		cvc: '',
		city: '',
		zipCode: '',
		expMonth: '',
		expYear: ''
	});

	const {
		cardholderName,
		fullName,
		cardNumber,
		emailAddress,
		cvc,
		city,
		zipCode,
		expMonth,
		expYear
	} = data;

	const handlePaymentMethod = (method) => {
		setPaymentMethod(method);
	};

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (
			!cardholderName ||
			!fullName ||
			!cardNumber ||
			!emailAddress ||
			!cvc ||
			!city ||
			!zipCode ||
			!expMonth ||
			!expYear
		) {
			toast.error('Please fill all the necessary fields', {
				position: 'top-right',
				autoClose: false,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
		} else {
			setIsLoading(true);
			await createPayment();
			setIsLoading(false);
		}
	};

	const createPayment = async () => {
		try {
			const res = await axios.post('/api/payment', data);
			if (res.status == 201) {
				toast.success('Payment succussfull', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
				setData({
					cardholderName: '',
					fullName: '',
					cardNumber: '',
					emailAddress: '',
					cvc: '',
					city: '',
					zipCode: '',
					expMonth: '',
					expYear: ''
				});
			}
		} catch (err) {
			toast.error('Error while creating the payment, please try again', {
				position: 'top-right',
				autoClose: false,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
			console.error(err.response.data);
		}
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className='container'>
			<div cllassName='container'>
				<div className='row'>
					<div className='col-md-2 justify-content-center'>
						<div
							className={`border text-center p-2 ${
								paymentMethod === 1 ? 'border-primary' : ''
							}`}
							onClick={() => handlePaymentMethod(1)}>
							<img
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAyyJ_mPWowDRfVADHNeWrzCKzloqziSmRDg&usqp=CAU'
								alt=''
								height={50}
							/>
						</div>
					</div>
					<div className='col-md-2'>
						<div
							className={`border text-center p-2 ${
								paymentMethod === 2 ? 'border-primary' : ''
							}`}
							onClick={() => handlePaymentMethod(2)}>
							<img
								src='https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png'
								alt=''
								height={50}
							/>
						</div>
					</div>
				</div>
			</div>
			<form className='row g-3 m-3' onSubmit={onSubmit}>
				<div className='col-md-6'>
					<div className='col-md-12 py-2'>
						<h4>Card info</h4>
					</div>
					<Input
						type='text'
						name='cardholderName'
						value={cardholderName}
						onChange={onChange}
						label='Cardholder Name,'
						className='col-md-12'
						placeHolder='John doe'
					/>

					<Input
						type='text'
						name='cardNumber'
						value={cardNumber}
						onChange={onChange}
						label='Card Number'
						className='col-md-12'
						placeHolder='xxxxxxxxxxxxxxxx'
					/>

					<div className='row'>
						<Input
							type='text'
							name='cvc'
							value={cvc}
							onChange={onChange}
							label='cvc'
							className='col-md-4'
							placeHolder='123'
						/>
						<Input
							type='text'
							name='expMonth'
							value={expMonth}
							onChange={onChange}
							label='Exp Month'
							className='col-md-4'
							placeHolder='06'
						/>
						<Input
							type='text'
							name='expYear'
							value={expYear}
							onChange={onChange}
							label='Exp Year'
							className='col-md-4'
							placeHolder='2022'
						/>
					</div>
				</div>
				<div className='col-md-6'>
					<div className='col-md-12 py-2'>
						<h4>Billing info</h4>
					</div>

					<Input
						type='text'
						name='fullName'
						value={fullName}
						onChange={onChange}
						label='Full Name'
						className='col-md-12'
						placeHolder='John doe'
					/>

					<Input
						type='text'
						name='emailAddress'
						value={emailAddress}
						onChange={onChange}
						label='Email Address'
						className='col-md-12'
						placeHolder='johndoe@gmail.com'
					/>

					<div className='row'>
						<Input
							type='text'
							name='city'
							value={city}
							onChange={onChange}
							label='city'
							className='col-md-8'
							placeHolder='Kurunegala'
						/>
						<Input
							type='text'
							name='zipCode'
							value={zipCode}
							onChange={onChange}
							label='Zip Code'
							className='col-md-4'
							placeHolder='60000'
						/>
					</div>
				</div>

				<div className='row pt-4 justify-content-end'>
					<button
						type='submit'
						className='col-3 btn btn-primary align-self-end'>
						Proceed payment
					</button>
				</div>
			</form>
		</div>
	);
};

export default PaymentPage;
