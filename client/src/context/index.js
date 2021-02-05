import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthStore from '../stores/auth/AuthStore';
import UserStore from '../stores/user/UserStore';
import GlobalStyle from '../design/GlobalStyle';
import { StylesProvider } from '@material-ui/styles';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			//if has an error, react query will throw error to let error boundary to handle
			//useErrorBoundary: true,
			// when user re-focus the app window, refetch data
			refetchOnWindowFocus: false,
			retry(failureCount, error) {
				if (error.status === 'fail') return false;
				if (failureCount < 2) return true;
				return false;
			}
		}
	}
});

const AppProviders = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<StylesProvider injectFirst>
				<GlobalStyle />
				<Router>
					<AuthStore>
						<UserStore>{children}</UserStore>
					</AuthStore>
				</Router>
			</StylesProvider>
		</QueryClientProvider>
	);
};

export { AppProviders };
