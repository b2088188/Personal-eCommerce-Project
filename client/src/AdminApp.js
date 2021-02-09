import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Footer } from './design/components';
import { Spinner, Message } from './design/elements';
import AdminHeader from './layout/admin/AdminHeader';
import { ErrorBoundary } from 'react-error-boundary';

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
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<AppRoutes />
					</ErrorBoundary>
					<Footer>Copyright &copy; Shunze Lin</Footer>
				</Container>
			</Suspense>
		</>
	);
};

const AppRoutes = () => {
	return (
		<>
			<Route path='/login' exact component={Login} />
			<Route path='/' exact component={OrdersView} />
			<Route path='/order/:orderId' exact component={OrderView} />
			<Route path='/products' exact component={Products} />
			<Route path='/products/edit/:productId?' exact component={ProductEdit} />
		</>
	);
};

const ErrorFallback = ({ error }) => {
	return (
		<Row>
			<Message text={error.message} severity='error' />;
		</Row>
	);
};

export default AdminApp;
