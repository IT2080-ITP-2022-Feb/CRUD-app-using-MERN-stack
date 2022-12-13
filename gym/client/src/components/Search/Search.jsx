import React, { useState } from 'react';
import Input from '../Input/Input';

const Search = ({ filterList }) => {
	const [term, setTerm] = useState('');
	const onChange = (e) => {
		setTerm(e.target.value);
		filterList(e.target.value);
	};
	return (
		<div className='row'>
			<div className='col-md-8 my-2'>
				<input
					type='text'
					name='term'
					value={term}
					onChange={onChange}
					placeHolder='Search'
					className='form-control'
				/>
			</div>
			<div className='col-md-4 my-2'>
				<button
					onClick={() => {
						filterList(term);
					}}
					className='btn btn-primary align-self-end w-100'>
					Search
				</button>
			</div>
		</div>
	);
};

export default Search;
