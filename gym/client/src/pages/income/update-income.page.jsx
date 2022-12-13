import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/Input/Input';
import Loading from '../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';

const UpdateIncomePage = ({}) => {
	const { id } = useParams();
	let navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		recieptId: '',
		management: '',
		type: '',
		value: 0
	});

	const { recieptId, management, type, value } = data;

	useEffect(() => {
		getIncome();
	}, []);

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
			await updateIncome();
			setIsLoading(false);
		}
	};
	const getIncome = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`/api/income/recieptId/${id}`);
			if (response.status === 200) {
				setData(response.data.income);
			}
		} catch (error) {
			toast.error(error.response.data.message, {
				autoClose: false
			});
		}
		setIsLoading(false);
	};

	const updateIncome = async () => {
		toast.dismiss();
		try {
			const response = await axios.put('/api/income', data);

			if (response.status === 200) {
				toast.success(response.data.message, {
					autoClose: 5000
				});
				return navigate('/income');
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
			<h2>Update Income</h2>

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
							disabled={true}
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
								Update Income
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateIncomePage;
