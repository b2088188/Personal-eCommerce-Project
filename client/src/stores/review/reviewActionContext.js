import {createContext} from 'react';
import useContextFactory from '../../customhooks/useContextFactory';

const ReviewActionContext = createContext();
ReviewActionContext.displayName = 'ReviewActionContext';

export const ReviewActionProvider = ReviewActionContext.Provider;

/* eslint-disable */
export const useReviewActions = useContextFactory('ReviewActionContext', ReviewActionContext);

export default ReviewActionContext;