import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import GlobalStyle from './design/GlobalStyle';
import { Container, Row, Footer } from './design/components';
import { Spinner } from './design/elements';
import ProductStore from './stores/product/ProductStore';
import OrderStore from './stores/order/OrderStore';
import AdminHeader from './layout/admin/AdminHeader';

const OrdersView = lazy(() => import('./components/admin/order/OrdersView'));
const OrderView = lazy(() => import('./components/admin/order/OrderView'));
const Login = lazy(() => import('./components/auth/Login'));
const Products = lazy(() => import('./components/admin/products/Products'));
const ProductEdit = lazy(() => import('./components/admin/products/ProductEdit'));

const AdminApp = () => {
	return (
		<>
			<Suspense
				fallback={
					<Row>
						<Spinner modifiers='dark' />
					</Row>
				}
			>
				<Container>
					<AdminHeader />
					<Route path='/login' exact component={Login} />
					<OrderStore>
						<Route path='/' exact component={OrdersView} />
						<Route path='/order/:orderId' exact component={OrderView} />
					</OrderStore>
					<ProductStore>
						<Route path='/products' exact component={Products} />
						<Route path='/products/edit/:productId?' exact component={ProductEdit} />
					</ProductStore>
					<Footer>Copyright &copy; Shunze Lin</Footer>
				</Container>
			</Suspense>
		</>
	);
};

export default AdminApp;
