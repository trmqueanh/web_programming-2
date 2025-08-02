const app = Vue.createApp({
    data() {
        return {
            cart:0,
            product: 'Socks',
            //task
            brand: 'Vue Mastery',
            description: 'Tran Mai Que Anh',
            //task
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            //task
            variants: [
              { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
              { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            // challenge
            onSale: true
        }
    },
    //task
    methods: {
        addToCart() {
            this.cart += 1
        },
        //task
        updateVariant(index) {
            this.selectedVariant = index
        }
    },
    //task
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        //task
        image() {
            return this.variants[this.selectedVariant].image
        },
        //task
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        // challenge
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale.'
            }
            return ''
        }//TRan MAi Que Anh
    }
})