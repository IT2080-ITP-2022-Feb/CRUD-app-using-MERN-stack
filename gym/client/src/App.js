import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import MainLayout from './Layout/main.layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<Router>
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<MainLayout>
					<div>
						<Routes>
							{routes.map((route, index) => {
								return (
									<Route
										key={index}
										element={route.component}
										exact
										path={route.path}
									/>
								);
							})}
						</Routes>
					</div>
				</MainLayout>
			</Router>
		</>
	);
}

export default App;
