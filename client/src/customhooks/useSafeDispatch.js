import React, {useRef, useEffect, useCallback} from 'react';

function useSafeDispatch(dispatch) {
	const mountedRef = useRef(false);

	useEffect(() => {
		mountedRef.current = true;
		return () => mountedRef.current = false;
	}, [])

	return useCallback((...args) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch]);
}

export default useSafeDispatch;