import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const ReviewStateContext = createContext();
ReviewStateContext.displayName = 'ReviewStateContext';

export const ReviewStateProvider = ReviewStateContext.Provider;

/* eslint-disable */
export const useReviewState = useContextFactory('ReviewStateContext', ReviewStateContext);

export default ReviewStateContext;