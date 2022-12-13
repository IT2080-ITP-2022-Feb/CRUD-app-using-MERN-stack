import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import Search from '../../components/Search/Search';
import Table from '../../components/Table/Table';

const ViewExpendituresPage = ({}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [expendituresList, setExpendituresList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	useEffect(() => {
		getExpendituresList();
	}, []);

	const getExpendituresList = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get('/api/expenditures');
			if (response.status === 200) {
				setExpendituresList(response.data.expendituress);
				setFilteredList(response.data.expendituress);
			}
		} catch (error) {
			toast.error('Error fetching expenditures list', {
				autoClose: false
			});
		}
		setIsLoading(false);
	};

	const onDelete = async (id) => {
		setIsLoading(true);
		try {
			const response = await axios.delete(`/api/expenditures/delete`, {
				data: { id }
			});
			if (response.status === 200) {
				toast.success(response.data.message, {
					autoClose: 5000
				});
				const newExpendituresList = expendituresList.filter(
					(expenditures) => expenditures._id !== id
				);
				setExpendituresList(newExpendituresList);
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
		setIsLoading(false);
	};
	const onSearch = (search) => {
		const newList = expendituresList.filter((income) => {
			return (
				income.management
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				income.voucherId.toLowerCase().includes(search.toLowerCase()) ||
				income.type.toLowerCase().includes(search.toLowerCase()) ||
				income.value.toString().includes(search.toLowerCase())
			);
		});
		setFilteredList(newList);
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<div>
			<h1>View Expenditures</h1>

			{expendituresList.length > 0 ? (
				<>
					<Search filterList={onSearch} />
					<Table
						headers={['Voucher ID', 'Management', 'Type', 'Value']}
						data={filteredList}
						keys={['voucherId', 'management', 'type', 'value']}
						onDelete={(id) => {
							onDelete(id);
						}}
						updateLink='/edit-expenditures'
						id='voucherId'
					/>
				</>
			) : (
				<div className='row text-center'>
					<h3>No expenditures found</h3>
					<Link to='/add-expenditures'>
						<button className='btn btn-primary'>
							Add Expenditures
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default ViewExpendituresPage;
