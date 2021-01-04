import React, {useMemo} from 'react';
import {ReviewStateProvider} from './reviewStateContext';
import {ReviewActionProvider} from './reviewActionContext';
import useFetch from '../../customhooks/useFetch';

const ReviewStore = ({
	children
}) => {
	const [stateReviews, fetchReviews] = useFetch({
    data: []
  });


	const value = useMemo(() => ({
		reviews: stateReviews.data.reviews,
		statusReviews: stateReviews.status,
		errorReviews: stateReviews.error	
	}), [stateReviews])

	const actions = useMemo(() => ({
				reviewsHandle: fetchReviews
			}), [fetchReviews]);

	return (
		<ReviewStateProvider value = {value}>
			<ReviewActionProvider value = {actions}>
				{children}
			</ReviewActionProvider>
		</ReviewStateProvider>
		)
}

export default ReviewStore;