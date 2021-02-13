import React, { lazy, Suspense } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Container, Row, Footer } from './design/components';
import { FullPageSpinner } from 'components/Spinner';
import { Message } from 'components/Message';
import AdminHeader from './layout/admin/AdminHeader';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const OrdersView = lazy(() => import('./screen/admin/order/OrdersView'));
const OrderView = lazy(() => import('./screen/admin/order/OrderView'));
const Login = lazy(() => import('./screen/auth/Login'));
const Products = lazy(() => import('./screen/admin/products/Products'));
const ProductEdit = lazy(() => import('./screen/admin/products/ProductEdit'));
const ErrorNotFound = lazy(() => import('./screen/error/ErrorNotFound'));

const AdminApp = () => {
	return (
		<Suspense fallback={<FullPageSpinner />}>
			<Container>
				<AdminHeader />
				<QueryErrorResetBoundary>
					{({ reset }) => (
						<ErrorBoundary FallbackComponent={ErrorFallback}>
							<AppRoutes />
						</ErrorBoundary>
					)}
				</QueryErrorResetBoundary>
				<Footer>Copyright &copy; Shunze Lin</Footer>
			</Container>
		</Suspense>
	);
};

const AppRoutes = () => {
	const location = useLocation();
	return (
		<TransitionGroup component={null}>
			<CSSTransition
				timeout={{
					appear: 250,
					enter: 250,
					exit: 250
				}}
				classNames='item'
				key={location.key}
			>
				<Switch location={location}>
					<Route path='/login' component={Login} />
					<Route path='/' exact component={OrdersView} />
					<Route path='/order/:orderId' component={OrderView} />
					<Route path='/products' component={Products} />
					<Route path='/products/edit/:productId?' component={ProductEdit} />
					<Route path='*' component={ErrorNotFound} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
	);
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	const history = useHistory();

	history.listen((location, action) => {
		if (error) resetErrorBoundary();
	});
	return (
		<Row>
			<Message text={error.message} severity='error' />;
		</Row>
	);
};

export default AdminApp;
