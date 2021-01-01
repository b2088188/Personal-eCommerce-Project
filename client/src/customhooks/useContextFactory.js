import React, {useContext} from 'react';
/* eslint-disable */
function useContextFactory(name, context) {
	return function () {	
 		const ctx = useContext(context);
 		// if(!ctx)
 		// 	return throw new Error(`use${name}Context must be used withing a ${name} ContextProvider`);
 		return ctx;
	}
}

export default useContextFactory;