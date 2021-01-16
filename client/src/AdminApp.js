import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyle from './design/GlobalStyle';
import OrderStore from './stores/order/OrderStore';
import AdminHeader from './layout/admin/AdminHeader';
import Footer from './layout/Footer';
import Spinner from './utils/Spinner';
const OrdersView = lazy(() => import('./components/admin/order/OrdersView'));
const OrderView = lazy(() => import('./components/admin/order/OrderView'));
const Login = lazy(() => import('./components/auth/Login'));

const AdminApp = () => {
	return (
		<>
			<GlobalStyle />
			<Router>
				<Suspense fallback={<Spinner />}>
					<div className='container'>
						<AdminHeader />
						<div className='content'>
							<Route path='/login' exact component={Login} />
							<OrderStore>
								<Route path='/' exact component={OrdersView} />
								<Route path='/order/:orderId' exact component={OrderView} />
							</OrderStore>
						</div>
						<Footer />
					</div>
				</Suspense>
			</Router>
		</>
	);
};

export default AdminApp;
