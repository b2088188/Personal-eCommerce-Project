import { createContext } from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const ReviewStateContext = createContext();
ReviewStateContext.displayName = 'ReviewStateContext';

const ReviewActionContext = createContext();
ReviewActionContext.displayName = 'ReviewActionContext';

export const ReviewStateProvider = ReviewStateContext.Provider;
export const ReviewActionProvider = ReviewActionContext.Provider;

/* eslint-disable */
const useReviewState = useContextFactory('ReviewStateContext', ReviewStateContext);
const useReviewActions = useContextFactory('ReviewActionContext', ReviewActionContext);
const useReview = () => [useReviewState(), useReviewActions()];
export default useReview;
