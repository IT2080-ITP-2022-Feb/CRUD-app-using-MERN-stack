import React from 'react';

const Input = ({
	label,
	name,
	value,
	type = 'text',
	onChange,
	placeHolder,
	className,
	...props
}) => {
	return (
		<div className={`${className} my-2`}>
			<label htmlFor={label} className='form-label'>
				{label}
			</label>
			<input
				type={type}
				className='form-control'
				onChange={onChange}
				value={value}
				name={name}
				placeholder={placeHolder}
				{...props}
			/>
		</div>
	);
};

export default Input;
