import React, { useMemo, useCallback } from 'react';
import { ReviewStateProvider, ReviewActionProvider } from './reviewContext';
import reviewReducer from './reviewReducer';
import useFetch from '../../customhooks/useFetch';
import axios from 'axios';
import { GET_REVIEWS, CREATE_REVIEW } from '../types';

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
			const { status } = await fetchReviews(
				axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${productId}/reviews`)
			);
			if (status === 'success') dispatchReviews({ type: GET_REVIEWS });
		},
		[fetchReviews, dispatchReviews]
	);

	const createReview = useCallback(
		async function (productId, rating, review) {
			const { status } = await fetchReviews(
				axios.post(
					`${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${productId}/reviews`,
					{ rating, review }
					// {
					// 	withCredentials: true
					// }
				)
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
