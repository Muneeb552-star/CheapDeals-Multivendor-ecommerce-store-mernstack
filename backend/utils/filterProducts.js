class FilterProducts {
    constructor(products, query) {
        this.products = products;
        this.query = query;
    }

    categoryFilter() {
        if (this.query.category) {
            this.products = this.products.filter(product => product.category === this.query.category);
        }
        return this;
    }

    ratingFilter() {
        if (this.query.rating) {
            const rating = parseInt(this.query.rating);
            this.products = this.products.filter(product => rating <= product.rating && product.rating <= rating + 1);
        }
        return this;
    }

    priceFilter() {
        const { lowPrice, highPrice } = this.query;
        this.products = this.products.filter(product => product.price >= lowPrice && product.price <= highPrice);
        return this;
    }

    searchFilter() {
        if (this.query.searchValue) {
            const searchValue = this.query.searchValue.toUpperCase();
            this.products = this.products.filter(product => product.name.toUpperCase().includes(searchValue));
        }
        return this;
    }

    sortByPrice() {
        if (this.query.sortPrice) {
            const sortOrder = (this.query.sortPrice === 'low-to-high') ? 1 : -1;
            this.products = this.products.sort((a, b) => sortOrder * (a.price - b.price));
        }
        return this;
    }

    skip() {
        const skipPage = (parseInt(this.query.pageNumber) - 1) * this.query.per_page;
        this.products = this.products.slice(skipPage);
        return this;
    }

    limit() {
        const limit = Math.min(this.query.per_page, this.products.length);
        this.products = this.products.slice(0, limit);
        return this;
    }

    getProducts() {
        return this.products;
    }

    countProducts() {
        return this.products.length;
    }
}

module.exports = FilterProducts;
