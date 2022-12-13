import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ headers, data, keys, onDelete, updateLink, id }) => {
	return (
		<>
			<table class='table'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						{headers.map((header, index) => {
							return (
								<th key={index} scope='col'>
									{header}
								</th>
							);
						})}
						{onDelete && <th scope='col'>Delete</th>}
						{updateLink && <th scope='col'>Update</th>}
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => {
						return (
							<tr key={index}>
								<th scope='row'>{index + 1}</th>
								{keys.map((key, index) => {
									return <td key={index}>{row[key]}</td>;
								})}
								{onDelete && (
									<td scope='col'>
										<button
											className='btn btn-danger'
											onClick={() => {
												window.confirm(
													'Are you sure you need to delete this?'
												) && onDelete(row['_id']);
											}}>
											Delete
										</button>
									</td>
								)}
								{updateLink && (
									<td scope='col'>
										<Link
											className='btn btn-primary'
											to={`${updateLink}/${row[id]}`}>
											Update
										</Link>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Table;
