import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../components/Input/Input';
import Loading from '../../components/loading/Loading';

const AddIncomePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		recieptId: '',
		management: '',
		type: '',
		value: 0
	});

	const { recieptId, management, type, value } = data;

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!recieptId || !management || !type || !value) {
			toast.error('Please fill all the necessary fields', {
				autoClose: false
			});
		} else {
			setIsLoading(true);
			await saveIncome();
			setIsLoading(false);
		}
	};

	const saveIncome = async () => {
		toast.dismiss();
		try {
			const response = await axios.post('/api/income', data);

			if (response.status === 201) {
				setData({
					recieptId: '',
					management: '',
					type: '',
					value: 0
				});
				toast.success(response.data.message, {
					autoClose: 5000
				});
			} else {
				toast.error(response.data.message, {
					autoClose: false
				});
			}
		} catch (error) {
			toast.error(error.response.data.message, {
				autoClose: false
			});
		}
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className='container'>
			<h2>Add Income</h2>
			<div className='row justify-content-center'>
				<div className='col-md-8'>
					<form className='row mt-3' onSubmit={onSubmit}>
						<Input
							label='Reciept ID'
							name='recieptId'
							type='text'
							placeHolder='Reciept ID'
							onChange={onChange}
							value={recieptId}
						/>
						<Input
							label='Management'
							name='management'
							type='text'
							placeHolder='Management'
							onChange={onChange}
							value={management}
						/>
						<Input
							label='Type'
							name='type'
							type='text'
							placeHolder='Type'
							onChange={onChange}
							value={type}
						/>
						<Input
							label='Value'
							name='value'
							type='text'
							placeHolder='Value'
							onChange={onChange}
							value={value}
						/>
						<div className='row pt-4 justify-content-end'>
							<button
								type='submit'
								className='col-3 btn btn-primary align-self-end'>
								Add Income
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddIncomePage;
