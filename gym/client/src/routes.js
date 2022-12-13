import AddExpendituresPage from './pages/expenditures/add-expenditures.page';
import UpdateExpendituresPage from './pages/expenditures/update-expenditures.page';
import ViewExpendituresPage from './pages/expenditures/view-expenditures.page';
import HomePage from './pages/Home.page';
import AddIncomePage from './pages/income/add-income.page';
import UpdateIncomePage from './pages/income/update-income.page';
import ViewIncomePage from './pages/income/view-income.page';
import PaymentPage from './pages/payment/payment.page';

export const routes = [
	{
		path: '/',
		component: <HomePage />
	},
	{
		path: '/payment',
		component: <PaymentPage />
	},
	{
		path: '/income',
		component: <ViewIncomePage />
	},
	{
		path: '/add-income',
		component: <AddIncomePage />
	},
	{
		path: '/edit-income/:id',
		component: <UpdateIncomePage />
	},
	{
		path: '/expenditures',
		component: <ViewExpendituresPage />
	},
	{
		path: '/add-expenditures',
		component: <AddExpendituresPage />
	},
	{
		path: '/edit-expenditures/:id',
		component: <UpdateExpendituresPage />
	}
];
