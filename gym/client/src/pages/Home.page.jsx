import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div className='container'>
			<div className='row justify-content-center'>
				<Link
					className='col-md-3 m-4 p-4'
					style={{
						background: 'grey',
						color: 'white',
						textDecoration: 'none'
					}}
					to='/add-expenditures'>
					Add Expenditures
				</Link>
				<Link
					className='col-md-3 m-4 p-4'
					style={{
						background: 'grey',
						color: 'white',
						textDecoration: 'none'
					}}
					to='/expenditures'>
					View Expenditures
				</Link>
			</div>
			<div className='row justify-content-center'>
				<Link
					className='col-md-3 m-4 p-4'
					style={{
						background: 'grey',
						color: 'white',
						textDecoration: 'none'
					}}
					to='/add-income'>
					Add Income
				</Link>
				<Link
					className='col-md-3 m-4 p-4'
					style={{
						background: 'grey',
						color: 'white',
						textDecoration: 'none'
					}}
					to='/income'>
					View Income
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
