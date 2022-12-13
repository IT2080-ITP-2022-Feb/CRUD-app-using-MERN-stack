import React from 'react';
import './Loading.styles.css';

const Loading = () => {
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				zIndex: '100000',
				background: '#06000052',
				position: 'fixed',
				top: '0',
				left: '0'
			}}
			className={'d-flex justify-content-center align-items-center'}>
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loading;
