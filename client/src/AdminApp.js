import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyle from './design/GlobalStyle';
import { Container, Row } from './design/components';
import UserStore from './stores/user/UserStore';
import ProductStore from './stores/product/ProductStore';
import OrderStore from './stores/order/OrderStore';
import AdminHeader from './layout/admin/AdminHeader';
import Footer from './layout/Footer';
import Spinner from './utils/Spinner';
const OrdersView = lazy(() => import('./components/admin/order/OrdersView'));
const OrderView = lazy(() => import('./components/admin/order/OrderView'));
const Login = lazy(() => import('./components/auth/Login'));
const Products = lazy(() => import('./components/admin/products/Products'));
const ProductEdit = lazy(() => import('./components/admin/products/ProductEdit'));

const AdminApp = () => {
	return (
		<>
			<GlobalStyle />
			<Router>
				<Suspense fallback={<Spinner />}>
					<Container>
						<AdminHeader />
						<Row>
							<UserStore>
								<Route path='/login' exact component={Login} />
								<OrderStore>
									<Route path='/' exact component={OrdersView} />
									<Route path='/order/:orderId' exact component={OrderView} />
								</OrderStore>
								<ProductStore>
									<Route path='/products' exact component={Products} />
									<Route path='/products/edit/:productId?' exact component={ProductEdit} />
								</ProductStore>
							</UserStore>
						</Row>
						<Footer />
					</Container>
				</Suspense>
			</Router>
		</>
	);
};

export default AdminApp;