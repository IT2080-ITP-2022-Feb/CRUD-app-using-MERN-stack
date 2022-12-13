import React from 'react';
import Navbar from './Navbar';

const MainLayout = (props) => {
	return (
		<div>
			<Navbar />
			<div className='container'>{props.children}</div>
		</div>
	);
};

export default MainLayout;
