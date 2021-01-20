export const setTransition = (
   { property, time, timing } = { property: 'all', time: '.3s', timing: 'linear' }
) => {
   return `transition: ${property} ${time} ${timing};`;
};
