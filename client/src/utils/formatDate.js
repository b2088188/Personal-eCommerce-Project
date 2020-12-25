function formatDate(dateString) {
	return new Date(dateString).toLocaleString('en-us');
}

export default formatDate;