class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search
    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                // Regex to get values from keyword
                $regex: this.queryStr.keyword,
                // Word match case-insensitive
                $options: 'i'
            }
        }:{};

        this.query.find({ ...keyword });
        return this;
    }

    // Filter
    filter() {
        // Create a copy of the query string
        const queryStrCopy = { ...this.queryStr };

        // Remove fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStrCopy[field]);

        // Convert the copy to a string and replace gt, gte, lt, lte with $gt, $gte, $lt, $lte
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // Convert the string back to an object
        const parsedQuery = JSON.parse(queryStr);

        this.query.find(parsedQuery);
        return this;
    }
    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage *(currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
