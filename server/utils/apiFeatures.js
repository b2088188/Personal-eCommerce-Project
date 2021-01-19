class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	filter() {
		let queryTitle = this.queryString.q
			? { name: { $regex: `${this.queryString.q}`, $options: 'i' } }
			: {};
		const queryObj = { ...this.queryString, ...queryTitle, q: null };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach((el) => delete queryObj[el]);
		this.query = this.query.find(queryObj);
		return this;
	}
	sort() {
		if (this.queryString.sort)
			this.query = this.query.sort(this.queryString.sort.split(',').join(' '));
		return this;
	}
	paginate() {
		const page = +this.queryString.page || 1;
		const limit = +this.queryString.limit || 100;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

export default APIFeatures;
