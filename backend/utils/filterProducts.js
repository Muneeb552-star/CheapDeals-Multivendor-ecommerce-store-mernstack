class filterProducts {
    products = []
    query = {}

    constructor(products, query){
        this.products = products
        this.query = query
    }

    categoryFilter = () => {
        this.products = this.query.category ? this.products.filter(product => product.category === this.query.category) : this.products
        return this
    }

    ratingFilter = () => {
        this.products = this.query.rating ? this.products.filter(product => parseInt(this.query.rating) <= product.rating && product.rating <= parseInt(this.query.rating) + 1) : this.products 
        return this
    }

    priceFilter = () => {
        this.products = this.products.filter(product => product.price >= this.query.lowPrice && product.price <= this.query.highPrice)
        return this
    }

    searchFilter = () => {
        this.products = this.query.searchValue ? this.products.filter(product => product.name.toUpperCase().indexOf(this.query.searchValue.toUpperCase()) > -1) : this.products
        return this
    }

    sortByPrice = () => {
        if (this.query.sortPrice) {
            if (this.query.sortPrice === 'low-to-high') {
                this.products = this.products.sort(function(a, b) { return a.price - b.price })
            } else {
                this.products = this.products.sort(function(a, b) { return b.price - a.price })
            }
        }
        return this
    }

    skip = () => {
        let { pageNumber } = this.query
        const skipPage = (parseInt(pageNumber) - 1) * this.query.per_page

        let skipProduct = []

        for(let i = skipPage; i < this.products.length; i++) {
            skipProduct.push(this.products[i])
        }
        this.products = skipProduct
        return this
    }

    limit = () => {
        let temp = []
        if (this.products.length > this.query.per_page) {
            for (let i = 0; i < this.query.per_page; i++) {
                temp.push(this.products[i])
            }
        } else {
            temp = this.products
        }
        this.products = temp

        return this
    }

    getProducts = () => {
        return this.products
    }

    countProducts = () => {
        return this.products.length
    }
}

module.exports = filterProducts