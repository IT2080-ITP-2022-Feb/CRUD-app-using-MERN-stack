import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import Table from '../../components/Table/Table';
import { Link } from 'react-router-dom';
import Search from '../../components/Search/Search';

const ViewIncomePage = ({}) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [incomeList, setIncomeList] = React.useState([]);
	const [filteredlist, setFilteredList] = React.useState([]);
	useEffect(() => {
		getIncomeList();
		return () => {};
	}, []);

	const getIncomeList = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get('/api/income');
			if (response.status === 200) {
				setIncomeList(response.data.incomes);
				setFilteredList(response.data.incomes);
			}
		} catch (error) {
			toast.error('Error fetching income list', {
				autoClose: false
			});
		}
		setIsLoading(false);
	};

	const onDelete = async (id) => {
		setIsLoading(true);
		try {
			const response = await axios.delete(`/api/income/delete`, {
				data: { id }
			});
			if (response.status === 200) {
				toast.success(response.data.message, {
					autoClose: 5000
				});
				const newIncomeList = incomeList.filter(
					(income) => income._id !== id
				);
				setIncomeList(newIncomeList);
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
		const newIncomeList = incomeList.filter((income) => {
			return (
				income.management
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				income.recieptId.toLowerCase().includes(search.toLowerCase()) ||
				income.type.toLowerCase().includes(search.toLowerCase()) ||
				income.value.toString().includes(search.toLowerCase())
			);
		});
		setFilteredList(newIncomeList);
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<h1>View Income</h1>
			{filteredlist.length > 0 ? (
				<>
					<Search filterList={onSearch} />
					<Table
						headers={['Recipet ID', 'Management', 'Type', 'Value']}
						data={filteredlist}
						keys={['recieptId', 'management', 'type', 'value']}
						onDelete={(id) => {
							onDelete(id);
						}}
						updateLink='/edit-income'
						id='recieptId'
					/>
				</>
			) : (
				<div className='row text-center'>
					<h3>No income found</h3>
					<Link to='/add-income'>
						<button className='btn btn-primary'>Add Income</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default ViewIncomePage;
