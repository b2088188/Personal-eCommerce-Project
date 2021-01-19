import React, { useMemo, useCallback } from 'react';
import { ReviewStateProvider } from './reviewStateContext';
import { ReviewActionProvider } from './reviewActionContext';
import reviewReducer from './reviewReducer';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import { REQUEST_RESOLVED, GET_REVIEWS, CREATE_REVIEW } from '../types';

const ReviewStore = ({ children }) => {
	const [stateReviews, fetchReviews, dispatchReviews] = useFetch(
		{
			data: null,
			reviews: []
		},
		reviewReducer
	);

	const getReviews = useCallback(
		async function (productId) {
			const { status } = await fetchReviews(axios.get(`/api/v1/products/${productId}/reviews`));
			if (status === 'success') dispatchReviews({ type: GET_REVIEWS });
		},
		[fetchReviews, dispatchReviews]
	);

	const createReview = useCallback(
		async function (productId, rating, review) {
			const { status } = await fetchReviews(
				axios.post(`/api/v1/products/${productId}/reviews`, { rating, review })
			);
			if (status === 'success') dispatchReviews({ type: CREATE_REVIEW });
		},
		[fetchReviews, dispatchReviews]
	);

	const value = useMemo(
		() => ({
			reviews: stateReviews.reviews,
			statusReviews: stateReviews.status,
			errorReviews: stateReviews.error
		}),
		[stateReviews]
	);

	const actions = useMemo(
		() => ({
			getReviews,
			createReview
		}),
		[getReviews, createReview]
	);

	return (
		<ReviewStateProvider value={value}>
			<ReviewActionProvider value={actions}>{children}</ReviewActionProvider>
		</ReviewStateProvider>
	);
};

export default ReviewStore;
