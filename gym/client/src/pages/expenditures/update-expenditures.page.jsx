import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/Input/Input';
import Loading from '../../components/loading/Loading';

const UpdateExpendituresPage = ({}) => {
	const { id } = useParams();
	let navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		voucherId: '',
		management: '',
		type: '',
		value: 0
	});

	const { voucherId, management, type, value } = data;

	useEffect(() => {
		getExpenditures();
	}, []);

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!voucherId || !management || !type || !value) {
			toast.error('Please fill all the necessary fields', {
				autoClose: false
			});
		} else {
			setIsLoading(true);
			await updateExpenditures();
			setIsLoading(false);
		}
	};
	const getExpenditures = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`/api/expenditures/voucherId/${id}`
			);
			if (response.status === 200) {
				setData(response.data.expenditures);
			}
		} catch (error) {
			toast.error(error.response.data.message, {
				autoClose: false
			});
		}
		setIsLoading(false);
	};

	const updateExpenditures = async () => {
		toast.dismiss();
		try {
			const response = await axios.put('/api/expenditures', data);

			if (response.status === 200) {
				toast.success(response.data.message, {
					autoClose: 5000
				});
				return navigate('/expenditures');
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
			<h2>Update Expenditures</h2>

			<div className='row justify-content-center'>
				<div className='col-md-8'>
					<form className='row mt-3' onSubmit={onSubmit}>
						<Input
							label='Reciept ID'
							name='voucherId'
							type='text'
							placeHolder='Reciept ID'
							onChange={onChange}
							value={voucherId}
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
								Update Expenditures
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateExpendituresPage;
